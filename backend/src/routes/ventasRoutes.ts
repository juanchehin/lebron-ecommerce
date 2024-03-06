import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import ventasController from '../controllers/ventasController';
const fs = require('fs');

const multer  = require('multer')

const uploadFolder = './uploads/comprobantes-venta';

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

class VentasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:pIdPersona/:pIdSucursal/:pIdTipoVenta/:pIdTransaccion/:FechaInicio/:FechaFin/:desde',[mdAutenticacion.verificaToken],ventasController.listarVentas);
        this.router.get('/listar/mis-ventas/:pDesde/:pFecha/:pIdPersona',ventasController.listarVentasIdUsuario);
        this.router.get('/listar/tipos-pago',ventasController.listarTiposPago);
        this.router.get('/datos-pdf/:pIdTransaccion',[mdAutenticacion.verificaToken],ventasController.dameDatosPDFVenta);
        this.router.get('/datos/dashboard/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],ventasController.dameDatosDashboard);
        this.router.get('/nueva/datos/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],ventasController.cargarDatosNuevaVenta);
        this.router.get('/baja/:IdPersona/:pIdTransaccion',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],ventasController.baja_transaccion);

        this.router.post('/alta/:IdPersona',upload.single('comprobante_venta'),[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], ventasController.altaVenta);
        // quimicos
        this.router.post('/quimicos/alta/:IdPersona',upload.single('comprobante_quimico'),[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], ventasController.altaVentaQuimicos);
        this.router.get('/quimicos/listar/:pIdPersona/:FechaInicio/:FechaFin/:desde/:estado_venta',[mdAutenticacion.verificaToken],ventasController.listarVentasQuimicos);

    }

}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;