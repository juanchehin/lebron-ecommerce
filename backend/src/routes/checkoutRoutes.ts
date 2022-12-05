import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import checkoutController from '../controllers/checkoutController';

class CheckoutRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/datos-comprar-ahora/:pIdPersona/:pIdProducto',checkoutController.datosComprarAhora);
        // 
        this.router.post("/payment/new/:costoEnvio/:pIdDireccion/:IdPersona/:pTotal",checkoutController.getMercadoPagoLink); 
        this.router.post("/webhook",checkoutController.webhook); 


    }

}

const checkoutRoutes = new CheckoutRoutes();
export default checkoutRoutes.router;