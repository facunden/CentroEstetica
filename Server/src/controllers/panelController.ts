import {NextFunction, Request, Response} from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {google} from "googleapis";


import pool from '../database';

const oauth2Client = new google.auth.OAuth2(
    '9993682516-6hlon9lugbouemnpjl24e59kjcek0fff.apps.googleusercontent.com',
    'p92yIypMWII55gfGNjEVpfve',
    'https://gestiones-app.herokuapp.com/panel/calendar/code'
);

class PanelController {

    public async getToken(req: Request, res: Response) {
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/drive'
            ],
            prompt: 'consent'
        });
        await res.redirect(url);
    }

    public async getCode(req: Request, res: Response) {
        const {tokens} = await oauth2Client.getToken(<any>req.query.code)
        oauth2Client.setCredentials(tokens);
        let a = await oauth2Client.getAccessToken();
        res.redirect('https://gestiones.dro.com.ar/#/home?access_token='+a.token+'&refresh_token='+oauth2Client.credentials.refresh_token);
    }

    public async getPermisoCategoria(req: Request, res: Response): Promise<void> {
        let idUsuario = req.params.idUsuario;
        await pool.query('SELECT `tipos_gestion_categorias`.`id`,\n' +
            '`tipos_gestion_categorias`.`descripcion`\n' +
            ' \n' +
            'FROM usuario_permisos_categorias\n' +
            'LEFT JOIN tipos_gestion_categorias ON tipos_gestion_categorias.`id` = usuario_permisos_categorias.`id_categoria`\n' +
            ' WHERE id_usuario = ?',idUsuario, function (error, results, fields) {
            res.json(results);
        });
    }

    public async getTareasPendientes(req: Request, res: Response): Promise<void> {
        let idUsuario = req.params.idUsuario;
        await pool.query('SELECT `tipos_gestion`.`id`,\n' +
            '`tipos_gestion`.`nombre_gestion`\n' +
            ' \n' +
            'FROM usuario_listado_tareas_pendientes\n' +
            'LEFT JOIN tipos_gestion ON tipos_gestion.`id` = usuario_listado_tareas_pendientes.`id_tipo_gestion`\n' +
            ' WHERE id_usuario = ?',idUsuario, function (error, results, fields) {
            res.json(results);
        });
    }

    public async setPermisoCategoria(req: Request, res: Response): Promise<void> {
        let permisos = req.body.permisos;
        let idUsuario = req.body.idUsuario;
        await pool.query('DELETE FROM usuario_permisos_categorias WHERE id_usuario = ?', idUsuario, function (error, results, fields) {
            if(results){
                permisos.map(async (permiso:any) =>{
                    await pool.query(`INSERT INTO usuario_permisos_categorias(id_categoria,id_usuario) VALUES (${permiso.id},${idUsuario})`,function (error, results, fields) {
                        }
                    )
                })
                res.json('okay')
            }
        });
    }

    public async setPendientes(req: Request, res: Response): Promise<void> {
        let pendientes = req.body.pendientes;
        let idUsuario = req.body.idUsuario;
        await pool.query('DELETE FROM usuario_listado_tareas_pendientes WHERE id_usuario = ?', idUsuario, function (error, results, fields) {
            if(results){
                pendientes.map(async (pendiente:any) =>{
                    await pool.query(`INSERT INTO usuario_listado_tareas_pendientes(id_tipo_gestion,id_usuario) VALUES (${pendiente.id},${idUsuario})`,function (error, results, fields) {
                        }
                    )
                })
                res.json('okay')
            }
        });
    }

    public async getUsuario(req: Request, res: Response): Promise<void> {
        let usuario = req.params.id;
        await pool.query('SELECT * FROM usuario WHERE id = ?', usuario, function (error, results, fields) {
            delete results[0]?.password;
            res.json(results[0]);
        });
    }

    public async getUsuarios(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT id,usuario,nombreApellido,flagManejoTareas,flagCrearUsuario,flagManejoCaja,flagGiftCard,flagStock FROM usuario', function (error, results, fields) {
            res.json(results);
        });
    }


    public async loguearUsuario(req: Request, res: Response): Promise<void> {
        let user = req.body.username;
        let password = req.body.password;
        await pool.query("SELECT id,usuario,nombreApellido,flagManejoTareas,flagCrearUsuario,flagManejoCaja,flagGiftCard,flagStock FROM usuario WHERE usuario = ? AND password = ?", [user, crypto.createHmac('sha256', password).digest('hex')], function (error, results, fields) {
            if (results.length > 0) {
                const secretToken = jwt.sign(JSON.stringify(results[0]), "GestionesAppJWT");
                results.push(secretToken);
                res.json(results);
            } else {
                res.send(false);
            }
        });
    }

    public async crearUsuario(req: Request, res: Response): Promise<void> {
        req.body.password = crypto.createHmac('sha256', req.body.password).digest('hex');
        await pool.query("INSERT INTO usuario set ?", req.body, function (error, results, fields) {
            if (!error) {
                res.send(true);
            } else {
                res.send(false);
            }
            ;
        });
    }

    public async updateUsuario(req: Request, res: Response): Promise<void> {
        let id = req.params.id
        if (req.body.password) {
            req.body.password = crypto.createHmac('sha256', req.body.password).digest('hex');
        }
        await pool.query("UPDATE usuario set ? WHERE id = ?", [req.body, id], function (error, results, fields) {
            if (!error) {
                res.send(true);
            } else {
                res.send(false);
            }
            ;
        });
    }

    public verifyToken(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            return res.status(401).send("Unauthorized Request");
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send("Unauthorized Request");
        } else {
            jwt.verify(token, "GestionesAppJWT", (err, decoded) => {
                if (err) {
                    return res.status(401).send("Unauthorized Request");
                }
                if (decoded) {
                    next();
                }
            });
        }
    }

}

export const panelController = new PanelController();
