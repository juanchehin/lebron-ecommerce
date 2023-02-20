import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import quimicosController from '../controllers/quimicosController';

class QuimicosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // *** Back ***
        // Quimicos
        this.router.get('/listar/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],quimicosController.listarQuimicosPaginado); 
        this.router.get('/listar/busqueda/autocomplete/:pQuimicoBuscado/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],quimicosController.buscarQuimicoAutoComplete); 
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdSucursal/:IdPersona',  [mdAutenticacion.verificaToken],quimicosController.buscarQuimicoPaginado); 
        this.router.get('/nuevo/datos-formulario',  [mdAutenticacion.verificaToken], quimicosController.cargarDatosFormNuevoQuimico);
        this.router.get('/editar/datos-formulario/:IdQuimico/:IdPersona',  [mdAutenticacion.verificaToken], quimicosController.cargarDatosFormEditarQuimico);
    }

}

const quimicosRoutes = new QuimicosRoutes();
export default quimicosRoutes.router;