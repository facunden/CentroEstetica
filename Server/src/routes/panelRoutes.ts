import { Router } from 'express';
import {panelController} from "../controllers/panelController";

class PanelRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', panelController.verifyToken, panelController.getUsuarios);
        this.router.get('/:id', panelController.verifyToken, panelController.getUsuario);
        this.router.post('/', panelController.loguearUsuario);
        this.router.post('/crearUsuario', panelController.verifyToken, panelController.crearUsuario);
        this.router.put('/updateUsuario/:id', panelController.verifyToken, panelController.updateUsuario);
        this.router.get('/verificarToken', panelController.verifyToken);
        this.router.get('/calendar/token', panelController.getToken);
        this.router.get('/calendar/code', panelController.getCode);
        this.router.get('/permisoUsuarioCat/:idUsuario', panelController.verifyToken, panelController.getPermisoCategoria);
        this.router.get('/pendientes/:idUsuario', panelController.verifyToken, panelController.getTareasPendientes);
        this.router.post('/pendientes/', panelController.verifyToken, panelController.setPendientes);
        this.router.post('/permisoUsuarioCat/', panelController.verifyToken, panelController.setPermisoCategoria);
    }
}

const panelRoutes = new PanelRoutes();

export default panelRoutes.router;
