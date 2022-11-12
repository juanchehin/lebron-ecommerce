import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import productosController from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Clientes
        this.router.get('/listar/promocion/:desde',productosController.listarProductosPromocion);
        
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;