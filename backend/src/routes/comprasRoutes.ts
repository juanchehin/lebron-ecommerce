import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import comprasController from '../controllers/comprasController';

class ComprasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.listarCompras);
        // this.router.get('/listar/mis-compras/:pDesde/:pFecha/:pIdPersona',comprasController.listarVentasIdUsuario);
        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.altaCompra);
        this.router.post('/gastos/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.altaGasto);

    }

}

const comprasRoutes = new ComprasRoutes();
export default comprasRoutes.router;