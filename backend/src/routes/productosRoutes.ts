import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import productosController from '../controllers/productosController';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // *** Front ***
        this.router.get('/front/buscar/:pDesde/:pParametroBusqueda',productosController.buscarProductoPaginadoFront);
        this.router.get('/producto/detalle/:pIdProducto/:pIdSabor',productosController.dameDatosProducto); 
        this.router.post('/alta/:IdPersona',productosController.altaProducto);
        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaProducto); 
        this.router.get('/listar/busqueda/autocomplete/transferencia/:pProductoBuscado/:pIdSucursalOrigen',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoCompleteTransferencia); 
        this.router.get('/stock/sabor/producto/:pIdProducto/:pIdSabor',productosController.dameStockSaborProducto);
        this.router.get('/promocion/home',productosController.listarPromocionesHome);
        this.router.get('/promociones/home/paginado/:pDesde',productosController.listarPromocionesPaginadoFront);
        this.router.get('/destacados/home',productosController.listarProductosDestacadosHome);
        this.router.get('/listar/categoria/:IdCategoria/:pDesde',productosController.listarProductosCategoria);

        // *** Back ***
        // Productos
        this.router.get('/publicar/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken],productosController.publicarProducto); 
        this.router.get('/destacar/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken],productosController.destacarProducto); 
        this.router.get('/ofertar/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken],productosController.ofertarProducto); 

        this.router.get('/listar/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.listarProductosPaginado); 
        this.router.get('/listar/busqueda/autocomplete/:pProductoBuscado/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],productosController.buscarProductoAutoComplete); 
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],productosController.buscarProductoPaginado); 
        this.router.get('/nuevo/datos-formulario',  [mdAutenticacion.verificaToken], productosController.cargarDatosFormNuevoProducto);
        this.router.get('/editar/datos-formulario/:IdProducto/:IdPersona',  [mdAutenticacion.verificaToken], productosController.cargarDatosFormEditarProducto);

        // Unidades
        this.router.get('/unidades/listar/:desde',productosController.listarUnidadesPaginado);
        this.router.get('/unidades/listar/',productosController.listarTodasUnidades);
        this.router.post('/unidades/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.altaUnidad); 
        this.router.post('/unidades/editar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.editarUnidad);
        this.router.get('/unidades/datos-formulario/:IdUnidad/:IdPersona',  [mdAutenticacion.verificaToken], productosController.cargarDatosFormEditarUnidad);
        this.router.get('/unidades/baja/:IdUnidad/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaUnidad); 

        // Promociones
        this.router.get('/promocion/detalle/:pIdPromocion/:pIdSabor1/:pIdSabor2',productosController.dameDatosPromocion);
        this.router.get('/promociones/listar/:pDesde',productosController.listarPromocionesPaginado);
        this.router.post('/promocion/alta/:IdPersona',  [mdAutenticacion.verificaToken],productosController.altaPromocion);
        this.router.get('/listar/promociones/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.listarPromociones);
        this.router.get('/promocion/publicar/:IdPromocion/:IdPersona',  [mdAutenticacion.verificaToken],productosController.publicarPromocion); 
        this.router.get('/promocion/baja/:pIdPromocion/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.bajaPromocion); 

        // Transferencias
        this.router.post('/transferencias/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],productosController.altaTransferencia); 
        this.router.get('/transferencias/listar/:pDesde/:pFecha/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], productosController.listarTransferenciasPaginado);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;