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
        
    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;