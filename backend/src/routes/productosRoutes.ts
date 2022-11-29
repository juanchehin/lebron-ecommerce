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
        this.router.get('/:pIdProducto',productosController.dameDatosProducto); 
        this.router.post('/alta',productosController.altaProducto); 
        this.router.get('/listar/:desde',productosController.listarProductosPaginado); 
        this.router.get('/listar/promocion/:desde',productosController.listarProductosPromocion);
        this.router.get('/listar/categoria/:IdCategoria/:pDesde',productosController.listarProductosCategoria);
        this.router.get('/buscar/:pProductoBuscado/:pDesde',productosController.buscarProductoPaginado);
        this.router.get('/destacados/home',productosController.listarProductosDestacadosHome);
        this.router.get('/promocion/home',productosController.listarProductosPromocionHome);
        this.router.get('/relacionados/:pIdProducto',productosController.listarProductosRelacionados);
        this.router.get('/listar/busqueda/:productoBuscado', productosController.buscarProducto);
        this.router.get('/nuevo/datos-formulario', productosController.cargarDatosFormNuevoProducto);
        // Unidades
        this.router.get('/unidades/listar/:desde',productosController.listarUnidadesPaginado);
        this.router.get('/unidades/listar/',productosController.listarTodasUnidadesPaginado);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;