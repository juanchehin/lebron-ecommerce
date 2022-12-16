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

    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;