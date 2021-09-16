import { Router } from 'express';

import {panelController} from "../controllers/panelController";
import {tratamientosController} from "../controllers/tratamientoController";

class TratamientosRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll',panelController.verifyToken, tratamientosController.getAllTratamientos);
        this.router.get('/getAllFathers',panelController.verifyToken, tratamientosController.getAllTratamientosFathers);
        this.router.get('/getAllChilds/:id',panelController.verifyToken, tratamientosController.getAllTratamientosChilds);
        this.router.get('/getById/:id',panelController.verifyToken, tratamientosController.getTratamientosPorID);
        this.router.post('/',panelController.verifyToken, tratamientosController.crearTratamiento);
        this.router.put('/:id',panelController.verifyToken, tratamientosController.updateTratamiento);
        this.router.delete('/:id',panelController.verifyToken, tratamientosController.deleteTratamiento);
    }
}

const tratamientosRoutes = new TratamientosRoutes();

export default tratamientosRoutes.router;
