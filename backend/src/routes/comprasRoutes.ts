import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import comprasController from '../controllers/comprasController';
const fs = require('fs');

const multer  = require('multer')

const uploadFolder = './uploads/comprobantes-gastos';

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

class ComprasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.listar_compras_paginado_fecha);
        // this.router.get('/listar/mis-compras/:pDesde/:pFecha/:pIdPersona',comprasController.listarVentasIdUsuario);
        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.altaCompra);
        this.router.post('/gastos/alta/:IdPersona',upload.single('comprobante_gasto'),[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.altaGasto);
        this.router.get('/gastos/listar/:desde/:pFecha/:pIdSucursal/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.listarGastosPaginado);


    }

}

const comprasRoutes = new ComprasRoutes();
export default comprasRoutes.router;