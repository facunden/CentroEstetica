import { Router } from 'express';
import {panelController} from "../controllers/panelController";
import {cajaDiariaController} from "../controllers/cajaDiariaController";


class CajaDiariaRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', panelController.verifyToken, cajaDiariaController.getAllCajaDiaria);
        this.router.post('/', panelController.verifyToken, cajaDiariaController.insertCaja);
        this.router.put('/:id', panelController.verifyToken, cajaDiariaController.updateCaja);
        this.router.delete('/:id', panelController.verifyToken, cajaDiariaController.deleteCaja);
    }
}

const cajaDiariaRoutes = new CajaDiariaRoutes();

export default cajaDiariaRoutes.router;
