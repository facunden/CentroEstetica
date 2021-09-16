import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import gestionesRoutes from './routes/gestionesRoutes';
import panelRoutes from './routes/panelRoutes';
import clientesRoutes from './routes/clientesRoutes';
import proveedoresRoutes from './routes/proveedoresRoutes';
import tratamientosRoutes from './routes/tratamientosRoutes';
import cajaDiariaRoutes from './routes/cajaDiariaRoutes';
import giftCardRoutes from './routes/giftCardRoutes';
import stockRoutes from "./routes/stockRoutes";
import referidosRoutes from "./routes/referidosRoutes";

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/gestiones', gestionesRoutes);
        this.app.use('/panel', panelRoutes);
        this.app.use('/clientes', clientesRoutes);
        this.app.use('/proveedores', proveedoresRoutes);
        this.app.use('/tratamientos', tratamientosRoutes);
        this.app.use('/caja-diaria', cajaDiariaRoutes);
        this.app.use('/gift-cards', giftCardRoutes);
        this.app.use('/stock', stockRoutes);
        this.app.use('/referidos', referidosRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}



const server = new Server();
server.start();
