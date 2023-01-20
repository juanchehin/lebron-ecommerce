import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import marcasController from '../controllers/marcasController';

class MarcasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Marcas
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],marcasController.altaMarca);
        this.router.get('/listar/:pDesde',marcasController.listarMarcasPaginado);
        this.router.get('/listar',marcasController.listarMarcas);
        this.router.get('/editar/datos-formulario/:pIdMarca/:IdPersona',  [mdAutenticacion.verificaToken], marcasController.cargarDatosFormEditarMarca);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken],marcasController.buscarMarcasPaginado); 
        this.router.get('/baja/:IdPersona/:pIdMarca',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],marcasController.bajaMarca); 
        this.router.post('/editar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],marcasController.editarMarca);
        this.router.get('/listar/productos/:pIdMarca/:pDesde',marcasController.dameProductosMarca); 

    }

}

const marcasRoutes = new MarcasRoutes();
export default marcasRoutes.router;