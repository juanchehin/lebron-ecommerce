import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import inversoresController from '../controllers/inversoresController';

class InversoresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        //
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],inversoresController.altaInversor);
        this.router.post('/editar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],inversoresController.editarInversor);
        this.router.get('/listar/paginado/:IdPersona/:desde/:inversorBuscado',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], inversoresController.buscarInversoresPaginado);
        this.router.get('/dame/todos/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,inversoresController.listarTodosInversores); 
        this.router.get('/baja/:pIdInversor/:IdPersona/one',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,inversoresController.bajaInversor); 
        this.router.get('/editar/datos-formulario/:pIdInversor/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], inversoresController.cargarDatosFormEditarInversor);

    }

}

const inversoresRoutes = new InversoresRoutes();
export default inversoresRoutes.router;