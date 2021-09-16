import { Router } from 'express';
import {clientesController} from "../controllers/clientesController";
import {panelController} from "../controllers/panelController";

class ClientesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
         this.router.get('/BuscarPorID/:id',panelController.verifyToken, clientesController.getClientePorID);
         this.router.get('/observaciones/:id',panelController.verifyToken, clientesController.getObservacionCliente);
         this.router.get('/',panelController.verifyToken, clientesController.getAllClientes);
         this.router.get('/tratamientos/porid/:id', panelController.verifyToken, clientesController.getTratamientoClientePorIDCliente);
         this.router.post('/crearCliente',panelController.verifyToken, clientesController.CrearCliente);
         this.router.post('/BuscarPorNombre',panelController.verifyToken, clientesController.getClientePorNombre);
         this.router.post('/tratamientos', panelController.verifyToken, clientesController.crearTratamientoCliente);
         this.router.post('/observaciones', panelController.verifyToken, clientesController.crearObservacionCliente);
         this.router.put('/actualizarCliente/:id',panelController.verifyToken, clientesController.updateCliente);
         this.router.put('/actualizarTratamientoCliente/:id',panelController.verifyToken, clientesController.updateTratamientoCliente);
         this.router.put('/actualizarTratamientoCliente/:id',panelController.verifyToken, clientesController.updateTratamientoCliente);
         this.router.delete('/observaciones/:id',panelController.verifyToken, clientesController.deleteObservacionCliente);
    }
}

const clientesRoutes = new ClientesRoutes();

export default clientesRoutes.router;
