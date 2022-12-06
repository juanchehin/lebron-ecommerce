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
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin',ventasController.listarVentas);
        this.router.get('/listar/mis-ventas/:pDesde/:pFecha/:pIdPersona',ventasController.listarVentasIdUsuario);
        this.router.get('/listar/tipos-pago',ventasController.listarTiposPago);
    }

}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;