import { Request, Response} from 'express';
import pool from "../database";

class CajaDiariaController{

    public async getAllCajaDiaria(req: Request, res: Response): Promise<void>{
        await pool.query('SELECT caja_diaria.*, proveedores.`nombre_apellido` FROM caja_diaria LEFT JOIN proveedores ON proveedores.id = caja_diaria.id_proveedor', function (error,results,fields) {
            res.json(results);
        });
    }

    public async insertCaja(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO caja_diaria set ?', req.body,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async updateCaja(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('UPDATE caja_diaria SET monto = ? WHERE id = ?', [req.body.monto,id],function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

    public async deleteCaja(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        await pool.query('DELETE FROM caja_diaria WHERE id = ?', id,function (err, results, fields) {
            if(!err){
                res.send(true);
            }else{
                res.send(false);
            }
        });
    }

}

export const cajaDiariaController = new CajaDiariaController();
