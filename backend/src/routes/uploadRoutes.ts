import { Router } from 'express';
const multer = require('multer');
var mdAutenticacion = require('../middlewares/autenticacion');
import uploadController from '../controllers/uploadController';
const path = require('path');
const pathImgTemp = path.join( __dirname, `../../public/uploads/images/temp` );

const fs = require('fs');

const uploadFolder = path.join( __dirname, `../uploads/imagenes/temp` );

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, uploadFolder);
    },
    filename: function (req: any, file: any, cb: any) {
        const newFileName = `${Date.now()}-${file.originalname}`;
        cb(null, newFileName);
    }
});


const upload = multer({ storage: storage });

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
            mdAutenticacion.verificaToken,
            this.upload.single('imagen'),
            (req: any, res) => { 
                uploadController.subirImagen(req,res)
            }
        );

        this.router.get('/imagenes/producto/eliminar/:IdPersona/:pIdImagen',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,uploadController.eliminarImagen); 

        this.router.get('/retorna/:id/',mdAutenticacion.verificaToken, uploadController.retornaImagen);
        this.router.get('/imagenes/producto/listar/:pDesde/:pIdProducto', uploadController.listarImagenesProductos);
        this.router.post('/imagenes/producto/alta/:pIdPersona',upload.single('imagen_producto'), uploadController.alta_imagen_producto);

    }

}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;