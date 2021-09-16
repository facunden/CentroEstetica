import { Router } from 'express';

import {panelController} from "../controllers/panelController";
import {stockController} from "../controllers/stockController"

class StockRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll',panelController.verifyToken, stockController.getAllProducts);
        this.router.get('/:id', panelController.verifyToken, stockController.getProductByID);
        this.router.post('/', panelController.verifyToken, stockController.createProduct);
        this.router.put('/:id', panelController.verifyToken, stockController.updateStock);
        this.router.delete('/:id', panelController.verifyToken, stockController.deleteStock);
    }
}

const stockRoutes = new StockRoutes()

export default stockRoutes.router;
