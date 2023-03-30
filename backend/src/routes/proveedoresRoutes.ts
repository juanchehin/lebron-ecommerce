import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import proveedoresController from '../controllers/proveedoresController';

class ProveedoresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        //
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],proveedoresController.altaProveedor);
        this.router.post('/editar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],proveedoresController.editarProveedor);
        this.router.get('/listar/:IdPersona/:desde',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,proveedoresController.listarProveedoresPaginado); 
        this.router.get('/dame/todos/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,proveedoresController.listarTodosProveedores); 
        this.router.get('/baja/:pIdProveedor/:IdPersona/one',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,proveedoresController.bajaProveedor); 
        this.router.get('/editar/datos-formulario/:pIdProveedor/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], proveedoresController.cargarDatosFormEditarProveedor);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken],proveedoresController.buscarProveedoresPaginado); 

    }

}

const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;