import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class DolaresController {


// ==================================================
//        Lista los ingresos
// ==================================================

public async listarHistoricoDolares(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    pool.query(`call bsp_listar_historico_dolares_paginado_fechas('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
       if(err){
            res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}


// ==================================================
//        Lista 
// ==================================================

public async listarDolaresIdUsuario(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    var pFecha = req.params.pFecha;
    var pIdPersona = req.params.pIdPersona;


    pool.query(`call bsp_listar_dolars_idusuario('${desde}','${pFecha}','${pIdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
            res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}

// ==================================================
//        Lista 
// ==================================================
altaCompraDolar(req: Request, res: Response) {

    pool.query(`call bsp_listar_tipos_pago()`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}

// ==================================================
//        
// ==================================================
altaVentaDolar(req: Request, res: Response) {

    var IdTransaccion = req.params.pIdTransaccion;

    pool.query(`call bsp_dame_datos_pdf_dolar('${IdTransaccion}')`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}

}


const dolarsController = new DolaresController;
export default dolarsController;