import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import categoriasController from '../controllers/categoriasController';

class CategoriasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/subcategorias',categoriasController.listarCategoriasSubcategorias);
        this.router.get('/listar/subcategorias/:pIdCategoria',categoriasController.listarSubcategoriasPorIdCategoria);
        // this.router.get('/listar/categoria/:IdCategoria/:pDesde/:IdPersona',categoriasController.listarProductosCategoria);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.buscarCategoriasPaginado);
        // this.router.get('/destacados/home',categoriasController.listarProductosDestacadosHome);
        // this.router.get('/relacionados/:pIdProducto',categoriasController.listarProductosRelacionados);
        // this.router.get('/buscar/datos-formulario', categoriasController.cargarDatosFormNuevoProducto);
        this.router.get('/editar/datos-formulario/:pIdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], categoriasController.cargarDatosFormEditarCategoria);
        this.router.get('/baja/:pIdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.bajaCategoria); 
        this.router.post('/editar/:IdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.editarCategoria); 
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.altaCategoria); 

    }

}

const categoriasRoutes = new CategoriasRoutes();
export default categoriasRoutes.router;