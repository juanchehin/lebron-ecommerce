import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ComprasController {


// ==================================================
//        Lista las compras
// ==================================================

public async listar_compras_paginado_fecha(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    
    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;
    var IdPersona = req.params.IdPersona;
    
    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_compras_paginado_fechas " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_listar_compras_paginado_fechas(?,?,?,?)',[IdPersona,FechaInicio,FechaFin,desde], function(err: any, result: any){

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_listar_compras_paginado_fechas - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
                
                if(err){
                    logger.error("Error en bsp_listar_compras_paginado_fechas - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_compras_paginado_fechas 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        Lista las compras
// ==================================================

public async cargar_detalle_compra(req: Request, res: Response): Promise<void> {

    console.log('req.params::: ', req.params);
    var p_id_transaccion = req.params.id_transaccion;
    var IdPersona = req.params.IdPersona;
    
    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_detalle_compra " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_listar_detalle_compra(?,?)',[IdPersona,p_id_transaccion], function(err: any, result: any){

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_listar_detalle_compra - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
                
                if(err){
                    logger.error("Error en bsp_listar_detalle_compra - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_detalle_compra 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        Lista 
// ==================================================

public async listarVentasIdUsuario(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    var pFecha = req.params.pFecha;
    var pIdPersona = req.params.pIdPersona;


    pool.query(`call bsp_listar_ventas_idusuario('${desde}','${pFecha}','${pIdPersona}')`, function(err: any, result: any, fields: any){
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
altaCompra(req: Request, res: Response) {

    var pLineasCompras = req.body[0];
    var pMontoTotal = req.body[1];
    var pDescripcion = req.body[2];

    var pIdComprador = req.params.IdPersona;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion altaCompra " + err);
            throw err; // not connected!
        }
       
        // Use the connection
        connection.query(`call bsp_alta_compra('${pIdComprador}','${pMontoTotal}','${pDescripcion}')`, function(err: any, result: any){
        
            if(err){
                logger.error("Error en altaCompra - ComprasController " + err );
           }      

           if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_alta_compra - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
            }
    
           // ==============================
           if(result[0][0].mensaje == 'Ok')
           {
    
            pLineasCompras.forEach(function (value: any) {
    
                connection.query(`call bsp_alta_linea_compra('${result[0][0].IdCompra}','${value.IdProductoSabor}','${value.Cantidad}')`, function(err: any, result2: any){
                        
                        if(err){
                            logger.error("Error en bsp_alta_linea_compra - ComprasController " + err );
    
                            res.send(err);
                            return;
                        }

                        if (result2 && result2[0] && result2[0][0] && result2[0][0].Level !== undefined) {

                            if(result2[0][0].Level == 'Error'){
                                logger.error("Error en bsp_alta_compra - result2 Code: " + result2[0][0].Code + " - Message: " + result2[0][0].Message);
                    
                                res.status(400).json(result2);
                                return;
                            }
                        }
                        
                    })
                    
                });
            }
            else{
                logger.error("Error en altaCompra - ComprasController " + result[0][0].Mensaje );
                res.status(404).json(err);
                return;
            }
            // ==============================
            res.send({ Mensaje: 'Ok'});
            
      });

      connection.release();
    });

}

// ==================================================
//        Lista 
// ==================================================
listarTiposPago(req: Request, res: Response) {

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
dameDatosPDFVenta(req: Request, res: Response) {

    var IdTransaccion = req.params.pIdTransaccion;

    pool.query(`call bsp_dame_datos_pdf_venta('${IdTransaccion}')`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}


// ==================================================
//        Lista 
// ==================================================
altaGasto(req: Request, res: Response) {

    var pIdUsuario = req.params.IdPersona;

    const file = req.file;
    var nombre_comprobante = file?.filename;

    var pMonto = req.body[0];
    var pTipoPago = req.body[1];
    var pFechaGasto = req.body[2];
    var pDescripcion = req.body[3];
    var pIdSucursal = req.body[4];
    console.log('req.body::: ', req.body);

    if(pDescripcion == 'undefined' || pDescripcion == undefined || pDescripcion == 'null' || pDescripcion == null)
    {
        pDescripcion = '-';
    }

    if(nombre_comprobante == 'undefined' || nombre_comprobante == undefined || nombre_comprobante == 'null' || nombre_comprobante == null)
    {
        nombre_comprobante = '-';
    }


    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_gasto " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_alta_gasto(?,?,?,?,?,?,?)',[pIdUsuario,pMonto,pTipoPago,pFechaGasto,pDescripcion,pIdSucursal,nombre_comprobante], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_gasto - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_alta_gasto - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
                
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_gasto 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });



}
// ==================================================
//        Lista 
// ==================================================
listarGastosPaginado(req: Request, res: Response) {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var pFechaInicio = req.params.pFechaInicio;
    var pFechaFin = req.params.pFechaFin;

    var pIdPersona = req.params.IdPersona;
    var pIdSucursal = req.params.pIdSucursal;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_gastos_paginado_fecha " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_listar_gastos_paginado_fecha(?,?,?,?,?)',[pIdPersona,pIdSucursal,pFechaInicio,pFechaFin,desde], function(err: any, result: any){

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_listar_gastos_paginado_fecha - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }

                if(err){
                    logger.error("Error en bsp_listar_gastos_paginado_fecha - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }                
                
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_gastos_paginado_fecha 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}


}


const comprasController = new ComprasController;
export default comprasController;