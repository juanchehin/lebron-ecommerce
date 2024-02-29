import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import ventasController from '../controllers/ventasController';

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

        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], ventasController.altaVenta);
    }

}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;