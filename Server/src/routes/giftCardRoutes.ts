import { Router } from 'express';
import {panelController} from "../controllers/panelController";
import {giftCardController} from "../controllers/giftCardController";

class GiftCardRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll',panelController.verifyToken,giftCardController.getAllGiftCards);
        this.router.put('/',panelController.verifyToken,giftCardController.changeState);
        this.router.post('/',panelController.verifyToken,giftCardController.crearGiftCard);
    }
}

const giftCardRoutes = new GiftCardRoutes();

export default giftCardRoutes.router;
