import { Request, Response} from 'express';

import pool from '../database';

class GestionesController{

    public async crearGestion(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO gestiones set ?', [req.body],function (err, results, fields) {
            res.json({text: "Gestion cargada"});
        });
    }

    public async crearTipoGestion(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO tipos_gestion set ?', req.body,function (err, results, fields) {
            res.json({text: "Tipo Gestion creada"});
        });
    }

    public async crearObservacionTab(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO observaciones_tabuladas set ?', req.body,function (err, results, fields) {
            res.send(true);
        });
    }

    public async getObservacionTabPorIDTipoGestion(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM observaciones_tabuladas WHERE id_tipo_gestion = ?', req.params.id,function (err, results, fields) {
            res.json(results);
        });
    }

    public async deleteTipoGestion(req: Request, res: Response): Promise<void> {
        await pool.query('DELETE FROM tipos_gestion WHERE id = ?', req.params.id,function (err, results, fields) {
            if(err){
                res.status(500).send("No puede eliminar un tipo de gestion que está siendo utilizado");
            }else{
                res.json({text: "Tipo Gestion borrada"});
            }
        })
    }

    public async deleteGestionPorID(req: Request, res: Response): Promise<void> {
        await pool.query('DELETE FROM gestiones WHERE id = ?', req.params.id,function (err, results, fields) {
            res.json({text: "Gestion borrada"});
        });
    }

    public async updateTipoGestion(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE tipos_gestion SET nombre_gestion = ? WHERE id = ?', [req.body,id],function (err, results, fields) {
            res.json({text: "Tipo Gestion update"});
        });
    }

    public async updateGestion(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        const {fecha_realizado,observacion} = req.body.gestion;
        await pool.query('UPDATE gestiones SET ? WHERE id = ?', [{fecha_realizado: fecha_realizado,observacion: observacion},id],function (err, results, fields) {
            if(!err){
                res.json({text: "Gestion updated"});
            }
        });
    }

    public async getGestionesPorIDCliente(req: Request, res: Response): Promise<void> {
        let idCliente = req.body.idCliente;
        let idUsuario = req.body.idUsuario;
        let tratamiento = req.body.id_tratamiento;
        await pool.query('SELECT gestiones.id, usuario.`usuario`,urealizado.`usuario` AS usuario_realizado,\n' +
            '            `gestion_concat`,`nombre_gestion`,`tipos_gestion`.`id_categoria_gestion`,gestiones.`obs_numerica`,\n' +
            '            observaciones_tabuladas.`tabulacion`,gestiones.fecha_carga,gestiones.flag_realizado,gestiones.`fecha_programada`,gestiones.`fecha_realizado`,gestiones.observacion,gestiones.id_cliente\n' +
            '            FROM gestiones\n' +
            '            LEFT JOIN `usuario` ON gestiones.`id_usuario` = usuario.`id`\n' +
            '            LEFT JOIN `observaciones_tabuladas` ON gestiones.`obs_tabulada` = observaciones_tabuladas.`id` \n' +
            '            LEFT JOIN tipos_gestion ON gestiones.`id_tipo_de_gestion` = `tipos_gestion`.`id`\n' +
            '            LEFT JOIN usuario_permisos_categorias ON usuario_permisos_categorias.`id_categoria` = tipos_gestion.`id_categoria_gestion`\n' +
            '            LEFT JOIN usuario AS urealizado ON gestiones.`id_usuario_realizado` = urealizado.id\n' +
            '            LEFT JOIN tratamientos ON gestiones.`id_tratamiento` = tratamientos.`id`\n' +
            '            WHERE id_cliente = ? AND\n' +
            '                        usuario_permisos_categorias.`id_usuario` = ? AND \n' +
            '             gestiones.`id_cliente` = ? AND tratamientos.id = ?',[idCliente,idUsuario,idCliente,tratamiento], function (error,results,fields) {
            res.json(results);
        });
    }

    public async getGestionPorID(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT gestiones.id, usuario.`usuario`,urealizado.usuario as usuario_realizado,`tipos_gestion`.`nombre_gestion`,gestiones.fecha_carga,gestiones.fecha_programada,gestiones.fecha_realizado,gestiones.flag_realizado,gestiones.observacion,gestiones.obs_numerica,gestiones.id_cliente\n' +
            '\n' +
            'FROM gestiones \n' +
            'LEFT JOIN `usuario` ON gestiones.`id_usuario` = usuario.`id` \n' +
            'LEFT JOIN tipos_gestion ON gestiones.`id_tipo_de_gestion` = `tipos_gestion`.`id`' +
            'LEFT JOIN usuario AS urealizado ON gestiones.`id_usuario_realizado` = urealizado.id WHERE gestiones.id = ?',id, function (error,results,fields) {
            res.json(results[0]);
        });
    }

    public async getTiposDeGestiones(req: Request, res: Response): Promise<void> {
        let idUsuario = req.params.id;
        await pool.query('SELECT            \n' +
            'tg.`id`,\n' +
            'tg.`nombre_gestion`,' +
            'tg.`crea_evento_calendar`,' +
            'tg.`crea_movimiento_caja`,\n' +
            'tg.realizado_automatico,\n' +
            'upc.`id_usuario`,\n' +
            'tg.`es_numerica`,\n' +
            'tg.`es_tabulada`,\n' +
            'tg.`notas`,\n'+
            'tg.`tiene_nota`\n'+
            'FROM tipos_gestion AS tg\n' +
            'INNER JOIN usuario_permisos_categorias AS upc ON upc.`id_categoria` = tg.`id_categoria_gestion`\n' +
            '            WHERE upc.`id_usuario` = ? AND tg.deshabilitada = 0',idUsuario , function (error,results,fields) {
            res.json(results);
        });
    }


    public async getTiposDeGestionesAll(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM tipos_gestion' , function (error,results,fields) {
            res.json(results);
        });
    }

    public async getCategoriasTiposGestion(req: Request, res: Response){
        await pool.query('SELECT * FROM tipos_gestion_categorias', function (error,results,fields) {
            res.json(results);
        });
    }

    public async crearCatTipoGestion(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO tipos_gestion_categorias set ?', req.body,function (err, results, fields) {
            res.json({text: "Categoria Tipo Gestion creada"});
        });
    }

    public async updateCatTipoGestion(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE tipos_gestion_categorias SET descripcion = ? WHERE id = ?', [req.body,id],function (err, results, fields) {
            res.json({text: "Categoria Tipo Gestion update"});
        });
    }

    public async updateObservacionTabulada(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE observaciones_tabuladas SET ? WHERE id = ?', [req.body,id],function (err, results, fields) {
            res.send(true);
        });
    }

    public async realizarGestion(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        const {fecha_realizado,id_usuario_realizado,flag_realizado} = req.body;
        await pool.query('UPDATE gestiones SET ? WHERE id = ?', [{fecha_realizado: fecha_realizado,
            id_usuario_realizado: id_usuario_realizado,
            flag_realizado: flag_realizado},id],function (err, results, fields) {
            res.json({text: "Gestion actualizada"});
        });
    }

    public async getTiposDeGestionesFathers(req: Request, res: Response): Promise<void> {
        let idUsuario = req.params.id;
        await pool.query('SELECT            \n' +
            'tg.`id`,\n' +
            'tg.`nombre_gestion`,' +
            'tg.`crea_evento_calendar`,\n' +
            'tg.`crea_movimiento_caja`,\n' +
            'tg.realizado_automatico,\n' +
            'upc.`id_usuario`,\n' +
            'tg.`id_categoria_gestion`,'+
            'tg.`es_numerica`,\n' +
            'tg.`es_tabulada`\n' +
            'FROM tipos_gestion AS tg\n' +
            '\n' +
            'INNER JOIN usuario_permisos_categorias AS upc ON upc.`id_categoria` = tg.`id_categoria_gestion`\n' +
            '            WHERE upc.`id_usuario` = ? AND tg.`fk_tipo_gestion` IS NULL AND tg.deshabilitada = 0',idUsuario , function (error,results,fields) {
            res.json(results);
        });
    }

    public async getTiposDeGestionesChilds(req: Request, res: Response): Promise<void> {
        let idUsuario = req.params.id;
        let fk_tipo_gestion = req.query.tipo;
        await pool.query('SELECT            \n' +
            'tg.`id`,\n' +
            'tg.`nombre_gestion`,' +
            'tg.`crea_evento_calendar`,\n' +
            'tg.`crea_movimiento_caja`,\n' +
            'tg.realizado_automatico,\n' +
            'upc.`id_usuario`,\n' +
            'tg.`es_numerica`,\n' +
            'tg.`es_tabulada`,\n' +
            'tg.`tiene_nota`,\n' +
            'tg.`notas`\n' +
            'FROM tipos_gestion AS tg\n' +
            '\n' +
            'INNER JOIN usuario_permisos_categorias AS upc ON upc.`id_categoria` = tg.`id_categoria_gestion`\n' +
            '            WHERE upc.`id_usuario` = ? AND tg.`fk_tipo_gestion` = ? AND tg.deshabilitada = 0',[idUsuario,fk_tipo_gestion], function (error,results,fields) {
            res.json(results);
        });
    }

    public async getGestionesPendientes(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT \n' +
            '\tgestiones.id,\n' +
            '\t`tipos_gestion`.`nombre_gestion`,\n' +
            '\tgestiones.fecha_carga,\n' +
            '\tgestiones.`fecha_programada`,\n' +
            '\tgestiones.`fecha_realizado`,\n' +
            '\tgestiones.observacion,\n' +
            '\tclientes.`nombre_cliente`\n' +
            'FROM gestiones\n' +
            'LEFT JOIN tipos_gestion ON gestiones.`id_tipo_de_gestion` = `tipos_gestion`.`id`\n' +
            'LEFT JOIN `clientes` ON clientes.`id` = gestiones.`id_cliente`\n' +
            'LEFT JOIN `usuario_listado_tareas_pendientes` ON gestiones.`id_tipo_de_gestion` = `usuario_listado_tareas_pendientes`.`id_tipo_gestion`\n' +
            'WHERE `usuario_listado_tareas_pendientes`.`id_usuario` = ? AND gestiones.`id_tipo_de_gestion` = usuario_listado_tareas_pendientes.`id_tipo_gestion` AND gestiones.`flag_realizado` = 0',
            id,function (err, results, fields) {
            res.json(results);
        });
    }

}

export const gestionesController = new GestionesController();
