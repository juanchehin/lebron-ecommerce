import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import personasController from '../controllers/personasController';

class PersonasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/',mdAutenticacion.verificaToken, personasController.list);
        this.router.get('/roles/listar', personasController.listarRoles);    // ,mdAutenticacion.verificaAdmin 

        // Clientes
        this.router.get('/clientes/:desde', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin],personasController.listarClientes);
        this.router.put('/cliente/eliminar/:IdPersona', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.eliminarCliente);    // Actualiza
        this.router.put('/cliente/actualizar/:id',  [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.actualizaCliente);    // Actualiza se quito esto , 13/03/20 --> 
        this.router.post('/cliente' ,  [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.createCliente);    // Se quito la autenticacion con token para esto
        this.router.get('/clientes/plan/:desde/:IdPlan', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.listarClientesPlan);    // ,mdAutenticacion.verificaAdmin 
        this.router.put('/cliente/activar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.activarCliente);    // Actualiza se quito esto , 13/03/20 --> 

        // Profesionales
        this.router.get('/profesionales/:desde',mdAutenticacion.verificaAdmin , personasController.listarProfesionales);
        this.router.get('/profesionales' , personasController.listarProfesionales);
        this.router.delete('/profesional/eliminar/:IdPersona', [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin], personasController.darBajaProfesional);
        this.router.get('/personal/listar/:desde/:incluyeBajas', [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin], personasController.listarPersonal);
        this.router.put('/profesional/actualizar/:id', [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin] , personasController.actualizaProfesional);    // Actualiza se quito esto , 13/03/20 --> 
        this.router.post('/profesional' ,  [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin] , personasController.createProfesional);    // Se quito la autenticacion con token para esto
        // ...
        this.router.get('/:id', personasController.getOne);
        this.router.get('/busqueda/:busqueda', personasController.buscar);
        this.router.get('/busqueda/plan/:Apellido/:Nombre/:IdPlan', personasController.buscarPorPlanEstado);
    }

}

const personasRoutes = new PersonasRoutes();
export default personasRoutes.router;