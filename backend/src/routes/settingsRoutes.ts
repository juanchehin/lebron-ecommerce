import { Router } from 'express';
import settingsController from '../controllers/settingsController';
var mdAutenticacion = require('../middlewares/autenticacion');

class SettingsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/listar/footer', settingsController.listarDatosFooter);
        this.router.get('/listar/empresa', settingsController.listarConfiguracionesEmpresa);
        // this.router.get('/drive/:name/:id', settingsController.sinc);
        this.router.get('/listar/:desde', settingsController.listarBackups);
        this.router.put('/actualizar', settingsController.actualizarConfiguraciones);
    }
}

const settingsRoutes = new SettingsRoutes();
export default settingsRoutes.router;