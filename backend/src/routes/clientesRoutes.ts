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
        this.router.get('/baja/:IdCliente/:IdPersona', clientesController.bajaCliente);
        this.router.get('/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.dameDatosCliente);
        this.router.get('/datos-envio/:IdPersona', clientesController.dameDatosClienteEnvio);
        this.router.get('/listar/busqueda/:clienteBuscado', clientesController.buscarCliente);
        this.router.get('/listar/paginado/:IdPersona/:desde/:clienteBuscado/:filtroCliente',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.buscarClientesPaginado);
        this.router.post('/direccion/alta', clientesController.altaDireccionCliente);
        this.router.get('/direcciones/:IdPersona' ,  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.dameDirecionesCliente);
        this.router.get('/editar/datos-formulario/:pIdCliente/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], clientesController.cargarDatosFormEditarCliente);
        this.router.post('/editar/:IdPersona', clientesController.editarCliente);
        this.router.post('/front/editar/:IdPersona', clientesController.editarClienteFront);

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