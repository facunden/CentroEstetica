import { Request, Response} from 'express';
import pool from "../database";

class ReferidosController{

    public async getAllRefers(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM referidos', function (error,results,fields) {
            res.json(results);
        });
    }

    public async getReferByID(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT * FROM referidos WHERE id = ?',[id] , function (error,results,fields) {
            res.json(results[0]);
        });
    }

    public async createRefer(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO referidos set ?', req.body,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async updateRefer(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE referidos SET ? WHERE id = ?', [req.body,id],function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async deleteRefer(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('DELETE FROM referidos WHERE id = ?', id,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

}

export const referidosController = new ReferidosController();
