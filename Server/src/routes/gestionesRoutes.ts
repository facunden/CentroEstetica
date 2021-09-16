import { Router } from 'express';

import { gestionesController} from "../controllers/gestionesController";
import {panelController} from "../controllers/panelController";

class GestionesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/PorTipos', panelController.verifyToken, gestionesController.getTiposDeGestionesAll);
        this.router.get('/PorTiposFathers/:id', panelController.verifyToken, gestionesController.getTiposDeGestionesFathers);
        this.router.get('/PorTiposChilds/:id', panelController.verifyToken, gestionesController.getTiposDeGestionesChilds);
        this.router.get('/PorTipos/permisos/:id', panelController.verifyToken, gestionesController.getTiposDeGestiones);
        this.router.get('/PorIdGestion/:id', panelController.verifyToken, gestionesController.getGestionPorID);
        this.router.get('/observacionesTab/porIdTipoGestion/:id', panelController.verifyToken, gestionesController.getObservacionTabPorIDTipoGestion);
        this.router.get('/GestionesPendientes/:id', panelController.verifyToken,gestionesController.getGestionesPendientes);
        this.router.get('/CategoriasGestiones', panelController.verifyToken, gestionesController.getCategoriasTiposGestion);
        this.router.post('/', panelController.verifyToken, gestionesController.crearGestion);
        this.router.post('/PorCliente', panelController.verifyToken, gestionesController.getGestionesPorIDCliente);
        this.router.post('/observacionesTab/', panelController.verifyToken, gestionesController.crearObservacionTab);
        this.router.post('/TipoGestion', panelController.verifyToken, gestionesController.crearTipoGestion);
        this.router.post('/CatTipoGestion', panelController.verifyToken, gestionesController.crearCatTipoGestion);
        this.router.delete('/TipoGestion/:id', panelController.verifyToken, gestionesController.deleteTipoGestion);
        this.router.delete('/Gestion/:id', panelController.verifyToken, gestionesController.deleteGestionPorID);
        this.router.put('/TipoGestion/:id', panelController.verifyToken, gestionesController.updateTipoGestion);
        this.router.put('/CatTipoGestion/:id', panelController.verifyToken, gestionesController.updateCatTipoGestion);
        this.router.put('/Gestion/:id', panelController.verifyToken, gestionesController.realizarGestion);
        this.router.put('/observacionesTab/:id', panelController.verifyToken, gestionesController.updateObservacionTabulada);
        this.router.put('/porIdGestion/:id', panelController.verifyToken, gestionesController.updateGestion);
    }
}

const gestionesRoutes = new GestionesRoutes();

export default gestionesRoutes.router;
