import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class MarcasController {
// ==================================================
//        Lista marcas
// ==================================================
public async listarMarcasPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_marcas_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error en bsp_listar_marcas_paginado - MarcasController ");
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista marcas par header
// ==================================================
public async listarMarcas(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_dame_marcas_home()`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error en bsp_dame_marcas_home - MarcasController ");
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Inserta 
// ==================================================
public async altaMarca(req: Request, res: Response) {

    var pMarca = req.body[0];
    var pDescripcion = req.body[1];

    pool.query(`call bsp_alta_marca('${req.params.IdPersona}','${pMarca}','${pDescripcion}')`, async function(err: any, result: any, fields: any){

        if(err || result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en bsp_alta_marca - MarcasController ");

            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

// ==================================================
//   Cargo 
// ==================================================
public async cargarDatosFormEditarMarca(req: Request, res: Response): Promise<void> {

    const { IdPersona } = req.params;
    const { pIdMarca } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_marca('${IdPersona}','${pIdMarca}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en bsp_dame_datos_form_editar_marca - MarcasController ");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//   Listado
// ==================================================
public async buscarMarcasPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    
    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion buscarMarcasPaginado " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_buscar_marcas_paginado(?,?,?)',[req.params.IdPersona,pParametroBusqueda,desde], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_buscar_marcas_paginado - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_marcas_paginado 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });
      
}

// ==================================================
//      
// ==================================================
public async bajaMarca(req: Request, res: Response): Promise<void> {

    var pIdMarca = req.params.pIdMarca;

    pool.query(`call bsp_baja_marca('${pIdMarca}')`, function(err: any, result: any){

        if(err || result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en bsp_baja_marca - MarcasController ");

            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }
        
        res.status(200).json(result);
    })
}


// ==================================================
//        Edita una marca
// ==================================================
public async editarMarca(req: Request, res: Response) {

    var pIdMarca = req.body[0];
    var pMarca = req.body[1];
    var pDescripcion = req.body[2];

    var pDescripcion =  pDescripcion.replace(/'/g, "");

    pool.query(`call bsp_editar_marca('${pIdMarca}','${pMarca}','${pDescripcion}')`, function(err: any, result: any){
        
        if(err || result[0][0].mensaje !== 'Ok'){
            logger.error("Error en bsp_editar_marca - MarcasController ");

            return res.json({
                ok: false,
                Mensaje: result[0][0].mensaje
            });
        }

        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//        
// ==================================================
public async dameProductosMarca(req: Request, res: Response): Promise<void> {
    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var pIdMarca = req.params.pIdMarca;

    pool.query(`call bsp_dame_productos_marca_id('${pIdMarca}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error en bsp_dame_productos_marca_id - MarcasController ");

            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

}


const marcasController = new MarcasController;
export default marcasController;