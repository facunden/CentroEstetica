import { Request, Response} from 'express';

import pool from '../database';

class ProveedoresController{

    public async getProveedores(req: Request, res: Response): Promise<void>{
        await pool.query('SELECT * FROM proveedores ORDER BY nombre_apellido ASC', function (error,results,fields) {
            res.json(results);
        });
    }


    public async getProveedoresPorNombre(req: Request, res: Response): Promise<void> {
        let {nombre_proveedor} = req.body
        await pool.query('SELECT * FROM proveedores WHERE nombre_apellido LIKE ?',['%'+nombre_proveedor+'%'] , function (error,results,fields) {
            res.json(results);
        });
    }

    public async getProveedorPorID(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        console.log(req.params);
        await pool.query('SELECT * FROM proveedores WHERE id = ?',[id] , function (error,results,fields) {
            res.json(results[0]);
        });
    }

    public async crearProveedor(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO proveedores set ?', req.body,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async updateProveedor(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE proveedores SET ? WHERE id = ?', [req.body,id],function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }
}

export const proveedoresController = new ProveedoresController();
