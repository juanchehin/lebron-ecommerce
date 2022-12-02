import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import clientesController from '../controllers/clientesController';

class ClientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Clientes
        this.router.post('/alta', clientesController.altaCliente);
        this.router.get('/:IdPersona', clientesController.dameDatosCliente);
        this.router.get('/datos-envio/:IdPersona', clientesController.dameDatosClienteEnvio);
        this.router.get('/listar/busqueda/:clienteBuscado', clientesController.buscarCliente);
        this.router.get('/listar/paginado/:desde', clientesController.listarClientesPaginado);
        this.router.post('/direccion/alta', clientesController.altaDireccionCliente);
        this.router.get('/direcciones/:IdPersona' ,  [mdAutenticacion.MismoUsuario], clientesController.dameDirecionesCliente);

    }

}

const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;