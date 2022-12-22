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
        this.router.post('/alta/:IdPersona', clientesController.altaCliente);
        this.router.get('/:IdPersona', clientesController.dameDatosCliente);
        this.router.get('/datos-envio/:IdPersona', clientesController.dameDatosClienteEnvio);
        this.router.get('/listar/busqueda/:clienteBuscado', clientesController.buscarCliente);
        this.router.get('/listar/paginado/:IdPersona/:desde/:clienteBuscado/:filtroCliente',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.buscarClientesPaginado);
        this.router.post('/direccion/alta', clientesController.altaDireccionCliente);
        this.router.get('/direcciones/:IdPersona' ,  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.dameDirecionesCliente);
        // carrito 
        this.router.post('/carrito/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.altaProductoCarrito);
        this.router.get('/carrito/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.listarCarritoCliente);
        this.router.get('/carrito/baja/:IdPersona/:IdProducto', clientesController.bajaProductoCarrito);
        // carrito 
        this.router.get('/mis-compras/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.listarComprasCliente);
    }

}

const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;