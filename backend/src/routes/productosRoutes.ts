import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import productosController from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Front
        this.router.get('/front/buscar/:pDesde/:pParametroBusqueda',productosController.buscarProductoPaginadoFront);
        //
        this.router.get('/producto/detalle/:pIdProducto/:pIdSabor',productosController.dameDatosProducto); 
        this.router.post('/alta/:IdPersona',productosController.altaProducto);
        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaProducto); 
        //
        this.router.get('/listar/busqueda/autocomplete/:pProductoBuscado',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoComplete); 
        this.router.get('/listar/busqueda/autocomplete/transferencia/:pProductoBuscado/:pIdSucursalOrigen',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoCompleteTransferencia); 
        this.router.get('/stock/sabor/producto/:pIdProducto/:pIdSabor',productosController.dameStockSaborProducto); 

        //
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
        this.router.get('/promocion/detalle/:pIdPromocion/:pIdSabor1/:pIdSabor2',productosController.dameDatosPromocion);
        this.router.get('/promociones/listar/:pDesde',productosController.listarPromocionesPaginado);
        this.router.post('/promocion/alta',productosController.altaPromocion);
        // Transferencias
        this.router.post('/transferencias/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.altaTransferencia); 
        this.router.get('/transferencias/listar/:pDesde/:pFecha/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], productosController.listarTransferenciasPaginado);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;