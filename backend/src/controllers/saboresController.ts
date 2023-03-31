import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class SaboresController {
// ==================================================
//        Lista
// ==================================================
public async listarSaboresPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_sabores_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Inserta 
// ==================================================
public async altaSabor(req: Request, res: Response) {

    var pSabor = req.body[0];
    var pDescripcion = req.body[1];

    pool.query(`call bsp_alta_sabor('${req.params.IdPersona}','${pSabor}','${pDescripcion}')`, async function(err: any, result: any, fields: any){

        if(err || result[0][0].Mensaje !== 'Ok'){
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
public async cargarDatosFormEditarSabor(req: Request, res: Response): Promise<void> {

    const { IdPersona } = req.params;
    const { pIdSabor } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_sabor('${IdPersona}','${pIdSabor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//   Listado
// ==================================================
public async buscarSaboresPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_sabores_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//      
// ==================================================
public async bajaSabor(req: Request, res: Response): Promise<void> {

    var pIdSabor = req.params.pIdSabor;

    pool.query(`call bsp_baja_sabor('${pIdSabor}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}


// ==================================================
//        Edita una 
// ==================================================
public async editarSabor(req: Request, res: Response) {

    var pIdSabor = req.body[0];
    var pSabor = req.body[1];
    var pDescripcion = req.body[2];

    var pDescripcion =  pDescripcion.replace(/'/g, "");

    pool.query(`call bsp_editar_sabor('${pIdSabor}','${pSabor}','${pDescripcion}')`, function(err: any, result: any){
        
        if(err || result.mensaje !== 'Ok'){
            logger.error("Error en editarSabor - bsp_editar_sabor - saboresController");

            return res.json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }

        return res.json({ mensaje: 'Ok' });
    })

}

}


const saboresController = new SaboresController;
export default saboresController;