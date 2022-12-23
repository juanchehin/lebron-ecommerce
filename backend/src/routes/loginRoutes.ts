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
        this.router.post('/recuperar-clave/:pEmail', loginController.recuperarClave);
        this.router.post('/nueva-pass', loginController.nuevaPassword);

    }

}

export default new LoginRoutes().router;

