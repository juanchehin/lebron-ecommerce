import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import personasController from '../controllers/personasController';

class PersonasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
    }

}

const personasRoutes = new PersonasRoutes();
export default personasRoutes.router;