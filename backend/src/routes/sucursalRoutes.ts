import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import sucursalesController from '../controllers/sucursalesController';

class SucursalesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // pedidos
        this.router.get('/listar',sucursalesController.listarTodasSucursales);
        // this.router.post('/confirmar', [mdAutenticacion.verificaToken] , pedidosController.confirmarPedido);
    }

}

const sucursalesRoutes = new SucursalesRoutes();
export default sucursalesRoutes.router;