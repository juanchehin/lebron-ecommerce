import express, { Router } from 'express';
import loginController from '../controllers/loginController';


class LoginRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/usuario', loginController.loginUsuario);
        this.router.post('/cliente', loginController.loginCliente);
        this.router.get('/control/estado/:IdPersona', loginController.actualizaEstadoCliente);
    }

}

export default new LoginRoutes().router;

