import { Request, Response } from 'express';
const path = require('path');
const fs = require('fs');
import pool from '../database';
const logger = require("../utils/logger").logger;

class UploadController {



// ==================================================
//    fileUpload
// ==================================================

public async subirImagen(req: any, res: Response){

    const IdProductoOrMarcaOrBanner = req.params.pIdProductoOrMarcaOrBanner;
    const NombreImagen = req.params.pNombreImagen;
    const tipo = req.params.pTipo;

    const tiposValidos = ['productos','banners','marcas'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido'
        });
    }

    // Validar que exista un archivo
    if (!req.file || Object.keys(req.file).length === 0) {
        logger.error("Error en subirImagen - uploadController");

        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Chequeo que no sea mayor a 5MB
    if (req.file.size > 5000000 ) {
        return res.status(400).json({
            ok: false,
            msg: 'Archivo demasiado grande'
        });
    }

    // Procesar la imagen...
    const file = req.file.originalname;

    const nombreCortado = file.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ Date.now() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const pathTemporal =  path.join( __dirname, `../../public/uploads/images/temp/${ req.file.filename }` );

    // Path para guardar la imagen
    const filePathMove = path.join( __dirname, `../../public/uploads/images/${ tipo }/${ nombreArchivo }` );

    // Mover la imagen
    fs.rename( pathTemporal , filePathMove, (err: any) => {
        if (err){
            logger.error("Error al mover imagen - uploadController " + err);

            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        const respuestaBD = actualizarBaseDeDatos( tipo, IdProductoOrMarcaOrBanner, nombreArchivo, NombreImagen );

        if (respuestaBD){
            logger.error("Error subirImagen - uploadController " + respuestaBD);

            return res.status(500).json({
                ok: false,
                msg: 'Ocurrio un problema, contactese con el administrador'
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}

// ==================================================
//        retornaImagen
// ==================================================
public async retornaImagen(req: Request, res: Response): Promise<any> {
    
    const id = req.params.id;

    const pathImg = path.join( __dirname, `../uploads/productos/${ id }` );

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        res.json({
            ok: false,
            msg: 'Imagen inexistente'
        });
    }

}

// ==================================================
//        
// ==================================================
public async listarImagenesProductos(req: Request, res: Response): Promise<void> {
    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var IdProducto = req.params.pIdProducto || 0;

    pool.query(`call bsp_listar_imagenes_producto_paginado('${desde}','${IdProducto}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(result);
            return;
        }
        res.status(200).json(result);
    })
}


// ==================================================
//        
// ==================================================
public async eliminarImagen(req: Request, res: Response): Promise<void> {
    var IdImagen = req.params.IdImagen;

    pool.query(`call bsp_eliminar_imagen('${IdImagen}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error bsp_eliminar_imagen - uploadController " + err);

            res.status(404).json(result);
            return;
        }

        var archivo = result[0][0].Archivo;
        var tipo = result[0][0].Tipo;

        switch (tipo) {
            case 'P':
                tipo = 'productos';
                break;
            case 'M':
                tipo = 'marcas';
                break;
            case 'R':
                tipo = 'promociones';
                break;
            default:
                res.status(404).json({Mensaje : 'Tipo desconocido'});
                return;
        }

        fs.unlinkSync(path.join( __dirname, `../../public/uploads/images/${ tipo }/${ archivo }` ));

        res.status(200).json(result);
    })
}
}

const uploadController = new UploadController;
export default uploadController;
// ==================================================
//        
// ==================================================
function actualizarBaseDeDatos(tipo: any, IdProductoOrMarcaOrBanner: any, nombreArchivo: string, NombreImagen: any): boolean {

    if(NombreImagen == null || NombreImagen == undefined || NombreImagen == 'undefined'){
        NombreImagen = '-';
    }

    switch( tipo ) {
        case 'productos':

            pool.query(`call bsp_alta_imagen_producto('${IdProductoOrMarcaOrBanner}','${nombreArchivo}','${NombreImagen}')`, function(err: any, result: any, fields: any){
                if(err || result.Mensaje != 'Ok'){
                    logger.error("Error bsp_alta_imagen_producto - actualizarBaseDeDatos - uploadController " + err);

                    return false;
                }
                return true;
            })

        break;
        
        case 'marcas':
            pool.query(`call bsp_alta_imagen_marca('${IdProductoOrMarcaOrBanner}','${nombreArchivo}','${NombreImagen}')`, function(err: any, result: any, fields: any){
                if(err){
                    return false;
                }
                return true;
            })

        break;
        
        case 'banners':

            pool.query(`call bsp_alta_imagen_banner('${IdProductoOrMarcaOrBanner}','${nombreArchivo}')`, function(err: any, result: any, fields: any){
                if(err){
                    return false;
                }
                return true;
            })

        break;
    }

    return false;
}
