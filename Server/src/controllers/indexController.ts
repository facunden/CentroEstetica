import { Request, Response} from 'express';

class IndexController{

    public index (req:Request, res:Response){
        res.json('"text": "LA API FUNCIONA"')
    }

}

export const indexController = new IndexController();
