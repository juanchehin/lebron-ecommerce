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
        this.router.get('/listar/:IdPersona/:desde',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,proveedoresController.listarProveedoresPaginado); 
        this.router.get('/dame/todos/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,proveedoresController.listarTodosProveedores); 
    }

}

const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;