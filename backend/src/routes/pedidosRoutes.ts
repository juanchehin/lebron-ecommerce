import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import pedidosController from '../controllers/pedidosController';

class PedidosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // pedidos
        this.router.get('/listar/:pDesde/:pFecha',pedidosController.listarPedidosPaginado);
        this.router.post('/confirmar', [mdAutenticacion.verificaToken] , pedidosController.confirmarPedido);
    }

}

const pedidosRoutes = new PedidosRoutes();
export default pedidosRoutes.router;