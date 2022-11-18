import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import clientesController from '../controllers/clientesController';

class ClientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Clientes
        this.router.post('/alta', clientesController.altaCliente);
    }

}

const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;