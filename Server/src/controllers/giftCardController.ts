import { Request, Response} from 'express';
import pool from "../database";

class GiftCardController{

    public async crearGiftCard(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO gift_cards set ?', [req.body],function (err, results, fields) {
            if(!err){
                res.status(200).send({ status: 'OK'});
            }
            else{
                res.send(false);
            }
        });
    }

    public async getAllGiftCards(req: Request, res: Response): Promise<void> {
        await pool.query('SELECT * FROM gift_cards ORDER BY id DESC',function (err, results, fields) {
            if(!err){
                res.json(results);
            }
            else{
                res.send(false);
            }
        });
    }

    public async changeState(req: Request, res: Response): Promise<void> {
        let activo = req.body.activo;
        let id = req.body.id;
        await pool.query('UPDATE gift_cards SET activo = ? WHERE id = ?',[activo,id],function (err, results, fields) {
            if(!err){
                res.status(200).send({ status: 'OK'});
            }
            else{
                res.send(false);
            }
        });
    }

}

export const giftCardController = new GiftCardController();
