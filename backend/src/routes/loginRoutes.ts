import express, { Router } from 'express';
import loginController from '../controllers/loginController';


class LoginRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', loginController.login);
        this.router.get('/control/estado/:IdPersona', loginController.actualizaEstadoCliente);
    }

}

export default new LoginRoutes().router;

