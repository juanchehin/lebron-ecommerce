import { Router } from 'express';
const multer = require('multer');
var mdAutenticacion = require('../middlewares/autenticacion');
import uploadController from '../controllers/uploadController';
const path = require('path');
const pathImgTemp = path.join( __dirname, `../../public/uploads/images/temp` );

class UploadRoutes {

    public router: Router = Router();   
    upload = multer({ dest: pathImgTemp });

    constructor() {
        this.config();
    }

    config(): void {
        
        // this.router.put('/cargar/:id/',(req: any, res) => { 
        //         uploadController.subirImagen(req,res)
        //     }
        // );

        this.router.put(
            '/imagenes/producto/alta/:pNombreImagen/:pIdProductoOrMarcaOrBanner/:pTipo',
            // mdAutenticacion.verificaToken,
            this.upload.single('imagen'),
            (req: any, res) => { 
                uploadController.subirImagen(req,res)
            }
        );

        this.router.get('/imagenes/producto/eliminar/:IdPersona/:IdImagen',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,uploadController.eliminarImagen); 

        this.router.get('/retorna/:id/',mdAutenticacion.verificaToken, uploadController.retornaImagen);
        this.router.get('/imagenes/producto/listar/:pDesde/:pIdProducto', uploadController.listarImagenesProductos);
        
    }

}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;