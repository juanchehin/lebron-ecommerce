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
        this.router.get('/listar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.listarCategorias);

        // 
        this.router.get('/listar/front/subcategorias',categoriasController.listarCategoriasSubcategorias);
        this.router.get('/listar/subcategorias/:pIdCategoria',categoriasController.listarSubcategoriasPorIdCategoria);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.buscarCategoriasPaginado);
        this.router.get('/editar/datos-formulario/:pIdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], categoriasController.cargarDatosFormEditarCategoria);
        this.router.get('/baja/:pIdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.bajaCategoria); 
        this.router.post('/editar/:IdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.editarCategoria); 
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.altaCategoria); 

        // Subcategorias
        this.router.get('/subcategorias/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.buscarSubCategoriasPaginado);
        this.router.get('/subcategorias/editar/datos-formulario/:pIdSubCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], categoriasController.cargarDatosFormEditarSubCategoria);
        this.router.get('/subcategorias/baja/:pIdCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.bajaSubCategoria); 
        this.router.post('/subcategorias/editar/:IdSubCategoria/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.editarSubCategoria); 
        this.router.post('/subcategorias/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],categoriasController.altaSubCategoria); 

    }

}

const categoriasRoutes = new CategoriasRoutes();
export default categoriasRoutes.router;