import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import direccionesController from '../controllers/direccionesController';

class DireccionesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Marcas
        this.router.get('/buscar/:pCP',direccionesController.buscarPorCP);
    }

}

const direccionesRoutes = new DireccionesRoutes();
export default direccionesRoutes.router;