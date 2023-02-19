import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class DolaresController {


// ==================================================
//  Lista los movimientos que se realizo en la compra/venta de dolares
// ==================================================

public async listarHistoricoDolares(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.pIdPersona;
    var pFiltroTipo = req.params.pFiltroTipo;
    
    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    pool.query(`call bsp_listar_historico_dolares_paginado_fechas('${pIdPersona}','${pFiltroTipo}','${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
       if(err){
            logger.error("Error en listarHistoricoDolares - DolaresController " + err);
            res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}


// ==================================================
//  Permite almacenar una compra de dolares
// ==================================================
altaCompraDolar(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;
    var monto = req.body[0];
    var observaciones = req.body[1];

    pool.query(`call bsp_alta_compra_dolares('${IdPersona}','${monto}','${observaciones}')`, function(err: any, result: any){
       if(err){
           logger.error("Error en altaCompraDolar - DolaresController " + err);
           res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}

// ==================================================
//  Permite almacenar una venta de dolar a un cierto comprador con monto
// ==================================================
altaVentaDolar(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    var IdComprador = req.body[0];
    var monto = req.body[1];
    var observaciones = req.body[2];

    pool.query(`call bsp_alta_venta_dolares('${IdPersona}','${IdComprador}','${monto}','${observaciones}')`, function(err: any, result: any){
       if(err){
            logger.error("Error en altaVentaDolar - DolaresController " + err);
            res.status(404).json(err);
            return;
       }
       res.json(result);
   })

}

}


const dolarsController = new DolaresController;
export default dolarsController;