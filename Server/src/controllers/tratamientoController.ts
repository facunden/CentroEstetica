import { Request, Response} from 'express';

import pool from '../database';

class TratamientoController{

    public async getAllTratamientos(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM tratamientos', function (error,results,fields) {
            res.json(results);
        });
    }

    public async getAllTratamientosFathers(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM tratamientos WHERE fk_tratamiento IS NULL', function (error,results,fields) {
            res.json(results);
        });
    }

    public async getAllTratamientosChilds(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT * FROM tratamientos WHERE fk_tratamiento = ?',id, function (error,results,fields) {
            res.json(results);
        });
    }

    public async getTratamientosPorID(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT * FROM tratamientos WHERE id = ?',[id] , function (error,results,fields) {
            res.json(results[0]);
        });
    }

    public async crearTratamiento(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO tratamientos set ?', req.body,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async updateTratamiento(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE tratamientos SET nombre_tratamiento = ? WHERE id = ?', [req.body.nombre_tratamiento,id],function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async deleteTratamiento(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('DELETE FROM tratamientos WHERE id = ?', id,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }
}

export const tratamientosController = new TratamientoController();
