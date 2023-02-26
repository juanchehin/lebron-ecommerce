import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import backupsController from '../controllers/backupsController';

class BackupsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // 
        this.router.get('/listar/:pDesde/:pFecha',backupsController.listarBackups);
    }

}

const backupsRoutes = new BackupsRoutes();
export default backupsRoutes.router;