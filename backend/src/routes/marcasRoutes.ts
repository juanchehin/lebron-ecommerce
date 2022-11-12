import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import marcasController from '../controllers/marcasController';

class MarcasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Marcas
        this.router.get('/listar',marcasController.listarMarcas);
        
    }

}

const marcasRoutes = new MarcasRoutes();
export default marcasRoutes.router;