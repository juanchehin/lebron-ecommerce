import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import cuentasController from '../controllers/cuentasController';

class CuentasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // 
        this.router.get('/listar/paginado/:IdPersona/:desde/:clienteBuscado',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], cuentasController.listarCuentasPaginado);
        this.router.get('/movimientos/listar/paginado/:IdPersona/:desde/:pIdCliente',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], cuentasController.cargarMovimientosClienteCuenta);
        this.router.post('/acreditar/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], cuentasController.altaAcreditarCliente);

    }
}

const cuentasRoutes = new CuentasRoutes();
export default cuentasRoutes.router;