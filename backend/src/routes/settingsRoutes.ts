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
        this.router.get('/listar/:desde', settingsController.listarBackups);
        this.router.put('/actualizar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], settingsController.actualizarConfiguraciones);
    }
}

const settingsRoutes = new SettingsRoutes();
export default settingsRoutes.router;