import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import ventasController from '../controllers/ventasController';

class VentasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // Clientes
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin',ventasController.listarVentas);
        
    }

}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;