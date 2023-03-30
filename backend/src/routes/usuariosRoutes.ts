import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import usuariosController from '../controllers/usuariosController';

class UsuariosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listarPaginado/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],usuariosController.listarUsuariosPaginado);
        this.router.post('/alta/:IdPersona' ,  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] , usuariosController.altaUsuario); 
        this.router.get('/:pIdPersona', usuariosController.dameUsuario);
        this.router.get('/baja/:IdPersona/:pIdUsuario',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], usuariosController.bajaUsuario);
        this.router.get('/editar/datos-formulario/:IdUsuario/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], usuariosController.cargarDatosFormEditarUsuario);
        this.router.post('/editar/:IdUsuario/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], usuariosController.editarUsuario);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken],usuariosController.buscarUsuarioPaginado); 

    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;