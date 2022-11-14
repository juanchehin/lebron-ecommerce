import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import productosController from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/promocion/:desde',productosController.listarProductosPromocion);
        this.router.get('/listar/categoria/:IdCategoria/:pDesde',productosController.listarProductosCategoria);
        this.router.get('/buscar/:pProductoBuscado/:pDesde',productosController.buscarProducto);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;