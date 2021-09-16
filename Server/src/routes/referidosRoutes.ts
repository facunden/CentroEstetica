import { Router } from 'express';
import {panelController} from "../controllers/panelController";
import {referidosController} from "../controllers/referidosController";

class ReferidosRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', panelController.verifyToken, referidosController.getAllRefers);
        this.router.get('/:id', panelController.verifyToken, referidosController.getReferByID);
        this.router.post('/', panelController.verifyToken, referidosController.createRefer);
        this.router.put('/:id', panelController.verifyToken, referidosController.updateRefer);
        this.router.delete('/:id', panelController.verifyToken, referidosController.deleteRefer);
    }
}

const referidosRoutes = new ReferidosRoutes();

export default referidosRoutes.router;
