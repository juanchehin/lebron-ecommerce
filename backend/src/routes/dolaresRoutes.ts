import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import dolaresController from '../controllers/dolaresController';

class DolaresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin',[mdAutenticacion.verificaToken],dolaresController.listarHistoricoDolares);
        this.router.post('/alta/compra/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], dolaresController.altaCompraDolar);
        this.router.post('/alta/venta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], dolaresController.altaVentaDolar);

    }

}

const dolaresRoutes = new DolaresRoutes();
export default dolaresRoutes.router;