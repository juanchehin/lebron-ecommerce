import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import dolaresController from '../controllers/dolaresController';

const fs = require('fs');
const multer  = require('multer');
const uploadFolder = './uploads/comprobantes-dolares';

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        console.log('uploadFolder::: ', uploadFolder);
        cb(null, uploadFolder);
    },
    filename: function (req: any, file: any, cb: any) {
        const newFileName = `${Date.now()}-${file.originalname}`;
        console.log('newFileName::: ', newFileName);
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

class DolaresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:pIdPersona/:pFiltroTipo/:desde/:FechaInicio/:FechaFin',[mdAutenticacion.verificaToken],dolaresController.listarHistoricoDolares);
        this.router.post('/alta/compra/:IdPersona',upload.single('comprobante_compra_dolar'),[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], dolaresController.altaCompraDolar);
        this.router.post('/alta/venta/:IdPersona',upload.single('comprobante_venta_dolar'),[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], dolaresController.altaVentaDolar);

    }

}

const dolaresRoutes = new DolaresRoutes();
export default dolaresRoutes.router;