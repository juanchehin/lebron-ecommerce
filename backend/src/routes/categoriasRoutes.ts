import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import categoriasController from '../controllers/categoriasController';

class CategoriasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Marcas
        this.router.get('/listar/subcategorias',categoriasController.listarCategoriasSubcategorias);
        
    }

}

const categoriasRoutes = new CategoriasRoutes();
export default categoriasRoutes.router;