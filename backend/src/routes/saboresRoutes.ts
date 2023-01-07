import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import saboresController from '../controllers/saboresController';

class SaboresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Sabores
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],saboresController.altaSabor);
        this.router.get('/listar/:pDesde',saboresController.listarSaboresPaginado);
        this.router.get('/editar/datos-formulario/:pIdSabor/:IdPersona',  [mdAutenticacion.verificaToken], saboresController.cargarDatosFormEditarSabor);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken],saboresController.buscarSaboresPaginado); 
        this.router.get('/baja/:IdPersona/:pIdSabor',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],saboresController.bajaSabor); 
        this.router.post('/editar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],saboresController.editarSabor);

    }

}

const saboresRoutes = new SaboresRoutes();
export default saboresRoutes.router;