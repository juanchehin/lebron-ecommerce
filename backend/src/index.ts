import express, { Application } from 'express';
import cors from 'cors';
const https = require("https");
const fs = require("fs");
const logger = require("./utils/logger").logger;

import loginRoutes from './routes/loginRoutes';
import uploadRoutes from './routes/uploadRoutes';
import settingsRoutes from './routes/settingsRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import marcasRoutes from './routes/marcasRoutes';
import productosRoutes from './routes/productosRoutes';
import categoriasRoutes from './routes/categoriasRoutes';
import proveedoresRoutes from './routes/proveedoresRoutes';
import ventasRoutes from './routes/ventasRoutes';
import clientesRoutes from './routes/clientesRoutes';
import inversoresRoutes from './routes/inversoresRoutes';
import direccionesRoutes from './routes/direccionesRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import pedidosRoutes from './routes/pedidosRoutes';
import sucursalesRoutes from './routes/sucursalRoutes';
import comprasRoutes from './routes/comprasRoutes';
import cuentasRoutes from './routes/cuentasRoutes';
import saboresRoutes from './routes/saboresRoutes';
import dolaresRoutes from './routes/dolaresRoutes';
import quimicosRoutes from './routes/quimicosRoutes';
import backupsRoutes from './routes/backupsRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', 3000);        
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static('public'))

    }

// ==================================================
//        RUTAS
// ==================================================
    routes(): void {

        this.app.use('/api/marcas', marcasRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/clientes', clientesRoutes);
        this.app.use('/api/inversores', inversoresRoutes);
        this.app.use('/api/dolares', dolaresRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/quimicos', quimicosRoutes);
        this.app.use('/api/pedidos', pedidosRoutes);
        this.app.use('/api/proveedores', proveedoresRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
        this.app.use('/api/direcciones', direccionesRoutes);
        this.app.use('/api/sucursales', sucursalesRoutes);
        this.app.use('/api/ventas', ventasRoutes);
        this.app.use('/api/sabores', saboresRoutes);
        this.app.use('/api/compras', comprasRoutes);
        this.app.use('/api/cuentas', cuentasRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api/uploads', uploadRoutes);
        this.app.use('/api/settings', settingsRoutes);
        this.app.use('/api/backups', backupsRoutes);
        this.app.use('/api/checkout', checkoutRoutes);

    }

// ==================================================
//   Inicio el servicio en el puerto 3000
// ==================================================
    start() {

        const enableHttps = false;
        const ssloptions: any = {}

        if (enableHttps) {
                ssloptions.key = fs.readFileSync('/etc/letsencrypt/live/lebron.chehin.online/privkey.pem');
                ssloptions.cert = fs.readFileSync('/etc/letsencrypt/live/lebron.chehin.online/fullchain.pem');
        }

        if (enableHttps) {
            https.createServer(ssloptions,this.app).listen(3000, function () {
                logger.info("HTTPS Server running on port 3000")
                console.log("HTTPS Server running on port 3000");
            });
        } else {
            this.app.listen(this.app.get('port'), () => {
                logger.info("HTTP Server running on port 3000")
                console.log('Server en puerto', this.app.get('port'));
            });
        }

    }

}

const server = new Server();
server.start();