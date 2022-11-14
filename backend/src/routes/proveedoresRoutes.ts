import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import proveedoresController from '../controllers/proveedoresController';

class ProveedoresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        //
        this.router.get('/listar/:desde',proveedoresController.listarProveedoresPaginado); 
    }

}

const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;