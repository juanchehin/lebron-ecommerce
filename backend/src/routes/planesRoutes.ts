import express, { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import planesController from '../controllers/planesController';

class PlanesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/listar/:desde/:incluyeBajas', planesController.list);
        this.router.get('/cliente/:id',mdAutenticacion.verificaToken, planesController.damePlanCliente);
        this.router.get('/todas', planesController.listAll);
        this.router.get('/:id',[mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin], planesController.getOne);
        this.router.put('/baja/:id' , [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin], planesController.baja);
        this.router.put('/actualiza/:IdPlan', [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin], planesController.update);    // Actualiza
        this.router.post('/', [mdAutenticacion.verificaToken,mdAutenticacion.verificaAdmin] , planesController.create);    // Se quito la autenticacion con token para esto - 28/12/19
    }

}

const planesRoutes = new PlanesRoutes();
export default planesRoutes.router;