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

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_historico_dolares_paginado_fechas " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_listar_historico_dolares_paginado_fechas(?,?,?,?,?)',[pIdPersona,pFiltroTipo,desde,FechaInicio,FechaFin], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_listar_historico_dolares_paginado_fechas - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_listar_historico_dolares_paginado_fechas - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_historico_dolares_paginado_fechas 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


}


// ==================================================
//  Permite almacenar una compra de dolares
// ==================================================
altaCompraDolar(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;
    
    var monto = req.body.monto_compra_dolar;
    var fecha_compra = req.body.fecha_compra_dolar;
    var observaciones = req.body.observaciones_compra_dolar;
    
    if(monto == null || monto == 'undefined' || monto <= 0)
    {
        logger.info("Monto invalido en alta compra");
        monto = 0;
    }
    
    if(fecha_compra == 'undefined')
    {
        logger.info("fecha_compra invalido en alta compra");
        fecha_compra = null;
    }
    
    if(observaciones == null || observaciones == 'undefined' || observaciones <= 0)
    {
        logger.info("observaciones invalido en alta compra");
        observaciones = "-";
    }
    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_compra_dolares " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_alta_compra_dolares(?,?,?,?)',[IdPersona,monto,fecha_compra,observaciones], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_compra_dolares - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_alta_compra_dolares - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_compra_dolares 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//  Permite almacenar una venta de dolar a un cierto comprador con monto
// ==================================================
altaVentaDolar(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    var monto = req.body.monto_venta_dolar;
    var fecha_compra = req.body.fecha_venta_dolar;
    var observaciones = req.body.observaciones_venta_dolar;

    if(monto == null || monto == 'undefined' || monto <= 0)
    {
        logger.info("Monto invalido en alta compra");
        monto = 0;
    }
    
    if(fecha_compra == 'undefined')
    {
        logger.info("fecha_compra invalido en alta compra");
        fecha_compra = null;
    }

    if(observaciones == null || observaciones == 'undefined' || observaciones <= 0)
    {
        logger.info("observaciones invalido en alta compra");
        observaciones = "-";
    }
    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_venta_dolares " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_alta_venta_dolares(?,?,?,?)',[IdPersona,monto,fecha_compra,observaciones], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_venta_dolares - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_alta_venta_dolares - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_venta_dolares 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


}

}


const dolarsController = new DolaresController;
export default dolarsController;