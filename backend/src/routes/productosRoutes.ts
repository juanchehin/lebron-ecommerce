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
        this.router.post('/alta/:IdPersona',productosController.altaProducto);
        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaProducto); 

        this.router.get('/listar/busqueda/autocomplete/:pProductoBuscado',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoComplete); 
        this.router.get('/listar/:desde',productosController.listarProductosPaginado); 
        this.router.get('/listar/promociones/:desde',productosController.listarPromociones);
        this.router.get('/listar/categoria/:IdCategoria/:pDesde',productosController.listarProductosCategoria);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.buscarProductoPaginado);
        this.router.get('/destacados/home',productosController.listarProductosDestacadosHome);
        this.router.get('/promocion/home',productosController.listarPromocionesHome);
        this.router.get('/relacionados/:pIdProducto',productosController.listarProductosRelacionados);
        this.router.get('/nuevo/datos-formulario', productosController.cargarDatosFormNuevoProducto);
        this.router.get('/editar/datos-formulario/:pIdProducto/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], productosController.cargarDatosFormEditarProducto);
        // Unidades
        this.router.get('/unidades/listar/:desde',productosController.listarUnidadesPaginado);
        this.router.get('/unidades/listar/',productosController.listarTodasUnidades);
        // Promociones
        this.router.get('/promociones/listar/:pDesde',productosController.listarPromocionesPaginado);
        this.router.post('/promocion/alta',productosController.altaPromocion);
        // Unidades
        this.router.post('/transferencias/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.altaTransferencia); 

    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;