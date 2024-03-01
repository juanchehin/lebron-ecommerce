import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import inversoresController from '../controllers/inversoresController';

const fs = require('fs');

const multer  = require('multer')

const uploadFolder = './uploads/comprobantes-inversiones';

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, uploadFolder);
    },
    filename: function (req: any, file: any, cb: any) {
        const newFileName = `${Date.now()}-${file.originalname}`;
        cb(null, newFileName);
    }
});


const upload = multer({ storage: storage });

class InversoresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        //
        this.router.post('/alta/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],inversoresController.altaInversor);
        this.router.post('/editar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],inversoresController.editarInversor);
        this.router.post('/alta/monto/:IdPersona',upload.single('comprobante_inversion'),  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],inversoresController.alta_inversion);
        this.router.post('/baja/monto/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],inversoresController.bajaMontoInversor);

        this.router.get('/listar/paginado/:IdPersona/:desde/:inversorBuscado',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], inversoresController.buscarInversoresPaginado);
        this.router.get('/dame/todos/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,inversoresController.listarTodosInversores); 
        this.router.get('/baja/:pIdInversor/:IdPersona/one',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] ,inversoresController.bajaInversor); 
        this.router.get('/editar/datos-formulario/:pIdInversor/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], inversoresController.cargarDatosFormEditarInversor);
        this.router.get('/historico/inversor/:IdInversor/:IdPersona/:desde/:FechaInicio/:FechaFin',[mdAutenticacion.verificaToken],inversoresController.listarHistoricoInversor);

    }

}

const inversoresRoutes = new InversoresRoutes();
export default inversoresRoutes.router;