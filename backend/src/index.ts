import express, { Application } from 'express';
import cors from 'cors';
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
import direccionesRoutes from './routes/direccionesRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import pedidosRoutes from './routes/pedidosRoutes';
import sucursalesRoutes from './routes/sucursalRoutes';
import comprasRoutes from './routes/comprasRoutes';
import cuentasRoutes from './routes/cuentasRoutes';



class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        // this.app.set('port', process.env.PORT || 3000);
        this.app.set('port', 3000);
        // CORS
        // this.app.use(function(req, res, next) {
        //     console.log('req es : ', req);
        //     res.header("Access-Control-Allow-Origin: http://localhost", "*");
        //     // res.header("Access-Control-Allow-Origin", "localhost:4220");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     res.header("Access-Control-Allow-Methods", "POST, GET, PUT , DELETE, OPTIONS");
        //     next();
        //   });
          
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        this.app.use(express.static('public'))
        
    }

// ==================================================
//        RUTAS
// ==================================================
    routes(): void {

        // ******* Configuracion de CORS ********
        // Creo una lista blanca
        // var listaBlanca = ['*']
        // // Creo la configuracion
        //   var configuracionCORS = {
        //     origin: function (req:any, res:any) {
        //       // console.log('req es : ', req);
        //       // console.log('listaBlanca.indexOf(req) es : ', listaBlanca.indexOf(req));
        //       // Pregunro si se encontro el valor ; -1 si no se encuentra dicho valor
        //       if (listaBlanca.indexOf(req) !== -1) {
        //         res(null, true)
        //       } else {
        //         res(new Error('Bloqueado por CORS'))
        //         return;
        //       }
        //     }
        //   }


        // this.app.use('/', cors(configuracionCORS),indexRoutes);
        this.app.use('/api/marcas', marcasRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/clientes', clientesRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/pedidos', pedidosRoutes);
        this.app.use('/api/proveedores', proveedoresRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
        this.app.use('/api/direcciones', direccionesRoutes);
        this.app.use('/api/sucursales', sucursalesRoutes);
        this.app.use('/api/ventas', ventasRoutes);
        this.app.use('/api/compras', comprasRoutes);
        this.app.use('/api/cuentas', cuentasRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api/uploads', uploadRoutes);
        this.app.use('/api/settings', settingsRoutes);
        this.app.use('/api/checkout', checkoutRoutes);

    }

// ==================================================
//   Inicio el servicio en el puerto 3000
// ==================================================
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();