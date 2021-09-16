import { Request, Response} from 'express';

import pool from '../database';

class ClientesController{

    public async getClientePorNombre(req: Request, res: Response): Promise<void> {
        let {nombre_cliente} = req.body
        await pool.query('SELECT * FROM clientes WHERE nombre_cliente LIKE ?',['%'+nombre_cliente+'%'] , function (error,results,fields) {
            res.json(results);
        });
    }

    public async getAllClientes(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM clientes' , function (error,results,fields) {
            res.json(results);
        });
    }

    public async getClientePorID(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT * FROM clientes WHERE id = ?',[id] , function (error,results,fields) {
            res.json(results[0]);
        });
    }

    public async CrearCliente(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO clientes set ?', req.body,function (err, results, fields) {
            if(!err){
                res.json(results);
            }
        });
    }

    public async getObservacionCliente(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT * FROM observaciones_clientes WHERE id_cliente = ?', id,function (err, results, fields) {
            if(!err){
                res.json(results);
            }
        });
    }

    public async crearObservacionCliente(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO observaciones_clientes set ?', req.body,function (err, results, fields) {
            if(!err){
                res.json(results);
            }
        });
    }

    public async deleteObservacionCliente(req: Request, res: Response): Promise<void> {
        let {id} = req.params
        await pool.query('DELETE FROM observaciones_clientes WHERE id = ?', id ,function (err, results, fields) {
            if(err){
                res.status(500).send("No se pudo borrar la observacion");
            }else{
                res.json({text: "Observacion borrada"});
            }
        });
    }

    public async updateCliente(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE clientes SET ? WHERE id = ?', [req.body,id],function (err, results, fields) {

            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async crearTratamientoCliente(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO tratamiento_cliente SET ? ',req.body,function (err, results, fields){
            res.json({text: 'Creado'});
        });
    }

    public async getTratamientoClientePorIDCliente(req: Request, res: Response): Promise<void>{
        await pool.query('SELECT `tratamiento_cliente`.*,`tratamientos`.`nombre_tratamiento`,`estados_tratamiento`.`nombre_estado`\n' +
            'FROM tratamiento_cliente \n' +
            'LEFT JOIN tratamientos ON `tratamientos`.`id` = tratamiento_cliente.`id_tratamiento`\n' +
            'LEFT JOIN estados_tratamiento ON estados_tratamiento.`id` = tratamiento_cliente.`id_estado_tratamiento`\n' +
            'WHERE id_cliente = ?',req.params.id,function (err, results, fields){
            res.json(results);
        });
    }

    public async updateTratamientoCliente(req: Request, res: Response): Promise<void>{
        let {id} = req.params
        await pool.query('UPDATE tratamiento_cliente SET ? WHERE id = ?',[req.body,id],function (err, results, fields){
            res.json({text: 'Creado'});
        });
    }
}

export const clientesController = new ClientesController();
