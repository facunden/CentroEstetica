import { Router } from 'express';

import { proveedoresController } from '../controllers/proveedoresController';
import {panelController} from "../controllers/panelController";

class ProveedoresRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll', panelController.verifyToken, proveedoresController.getProveedores);
        this.router.get('/get/porID/:id', panelController.verifyToken, proveedoresController.getProveedorPorID);
        this.router.put('/update/porID/:id', panelController.verifyToken, proveedoresController.updateProveedor);
        this.router.post('/crearProveedor', panelController.verifyToken,proveedoresController.crearProveedor);
    }
}

const proveedoresRoutes = new ProveedoresRoutes();

export default proveedoresRoutes.router;
