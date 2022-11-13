import express, { Application } from 'express';
import cors from 'cors';
import personasRoutes from './routes/personasRoutes';
import loginRoutes from './routes/loginRoutes';
import uploadRoutes from './routes/uploadRoutes';
import settingsRoutes from './routes/settingsRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import marcasRoutes from './routes/marcasRoutes';
import productosRoutes from './routes/productosRoutes';
import categoriasRoutes from './routes/categoriasRoutes';



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
        this.app.use('/api/personas', personasRoutes);
        this.app.use('/api/marcas', marcasRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api/upload', uploadRoutes);
        this.app.use('/api/settings', settingsRoutes);

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