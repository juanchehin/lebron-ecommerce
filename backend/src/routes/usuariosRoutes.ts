import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import usuariosController from '../controllers/usuariosController';

class UsuariosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Clientes
        this.router.get('/listarPaginado/:desde',usuariosController.listarUsuariosPaginado);
        this.router.post('/alta' , usuariosController.altaUsuario);    // Se quito la autenticacion con token para esto

    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;