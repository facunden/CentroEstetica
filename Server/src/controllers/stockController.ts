import { Request, Response} from 'express';

import pool from '../database';

class StockController{

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM stock', function (error,results,fields) {
            res.json(results);
        });
    }

    public async getProductByID(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('SELECT * FROM stock WHERE id = ?',[id] , function (error,results,fields) {
            res.json(results[0]);
        });
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO stock set ?', req.body,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async updateStock(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE stock SET ? WHERE id = ?', [req.body,id],function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async deleteStock(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('DELETE FROM stock WHERE id = ?', id,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }
}

export const stockController = new StockController();
