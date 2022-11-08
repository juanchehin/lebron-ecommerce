import express, { Router } from 'express';
// const multer = require('multer');

var mdAutenticacion = require('../middlewares/autenticacion');

import uploadController from '../controllers/uploadController';

class UploadRoutes {

    public router: Router = Router();
    // upload = multer({ dest: './build/uploads/clientes' });

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.put(
            '/cargar/:id/',
            mdAutenticacion.verificaToken,
            // this.upload.single('imagen'),
            (req: any, res) => { 
                uploadController.subirImagen(req,res)
            }
        );

        this.router.get('/retorna/:id/',mdAutenticacion.verificaToken, uploadController.retornaImagen);
    }

}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;