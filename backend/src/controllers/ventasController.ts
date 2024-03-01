import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class VentasController {

// ==================================================
//        Lista las ventas entre un rango de fechas
// ==================================================
public async listarUsuariosPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_usuarios_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.json(result);
    })
}


// ==================================================
//        Lista los ingresos
// ==================================================

public async listarVentas(req: Request, res: Response): Promise<void> {

    var pIdVendedor = req.params.pIdPersona;

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    var pIdSucursal = req.params.pIdSucursal;
    var pIdTipoVenta = req.params.pIdTipoVenta;
    var pITipoPago = req.params.pITipoPago;
    var pIdTransaccion = req.params.pIdTransaccion;
    
    var desde = req.params.desde || 0;
    desde  = Number(desde);
    

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_ventas_paginado_fechas " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_listar_ventas_paginado_fechas(?,?,?,?,?,?,?,?)',[pIdVendedor,pIdSucursal,pIdTipoVenta,pITipoPago,pIdTransaccion,FechaInicio,FechaFin,desde], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_listar_ventas_paginado_fechas - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_ventas_paginado_fechas 2 - " + error);
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

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_ventas_idusuario " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_listar_ventas_id_usuario(?,?,?)',[desde,pFecha,pIdPersona], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_listar_ventas_idusuario - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_ventas_idusuario 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        Lista 
// ==================================================
async altaVenta(req: Request, res: Response) {

    const file = req.file;
    const nombre_comprobante = file?.filename;

    var pIdVendedor = req.params.IdPersona;
    var pIdCliente = req.body.IdCliente;
    var pLineasVenta = req.body.lineas_venta;
    var pLineaTipoPago = req.body.lineas_tipos_pago;
    var tamaño_lineas_venta = req.body.cantidad_lineas_venta;
    var tamaño_tipos_pago = req.body.cantidad_lineas_tipo_pago;

    var pMontoTotal = req.body.totalVenta;
    var pFechaVenta = req.body.fecha_venta;
    var p_id_sucursal_seleccionada = req.body.id_sucursal_seleccionada;
    var p_id_tipo_venta_seleccionada = req.body.id_operacion_seleccionada;
       

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_venta " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_alta_venta(?,?,?,?,?,?,?,?,?,?,?)',[pIdVendedor,pIdCliente,pMontoTotal,pFechaVenta,p_id_sucursal_seleccionada,p_id_tipo_venta_seleccionada,
                pLineasVenta,tamaño_lineas_venta,pLineaTipoPago,tamaño_tipos_pago,nombre_comprobante], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_venta - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
                
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_venta 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });
    
}


// ==================================================
//        Lista 
// ==================================================
listarTiposPago(req: Request, res: Response) {

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_tipos_pago " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_listar_tipos_pago()', function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_listar_tipos_pago - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_tipos_pago 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        
// ==================================================
dameDatosPDFVenta(req: Request, res: Response) {

    var IdTransaccion = req.params.pIdTransaccion;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_buscar_cliente " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_dame_datos_pdf_venta(?)',[IdTransaccion], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_dame_datos_pdf_venta - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_dame_datos_pdf_venta 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}
// ==================================================
//        
// ==================================================
baja_transaccion(req: Request, res: Response) {

    var pIdVendedor = req.params.IdPersona;
    var pIdTransaccion = req.params.pIdTransaccion;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_baja_transaccion " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_baja_transaccion(?,?)',[pIdVendedor,pIdTransaccion], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_baja_transaccion - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_baja_transaccion 2 - " + error);
            res.status(500).send('Error interno del servidor - bsp_baja_transaccion');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        
// ==================================================
dameDatosDashboard(req: Request, res: Response) {

    pool.query(`call bsp_dame_datos_dashboard()`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}
// ==================================================
//        
// ==================================================
cargarDatosNuevaVenta(req: Request, res: Response) {

    var p_id_usuario = req.params.IdPersona;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_dame_datos_nueva_venta " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_dame_datos_nueva_venta(?)',[p_id_usuario], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_dame_datos_nueva_venta - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_dame_datos_nueva_venta 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


}


}


const ventasController = new VentasController;
export default ventasController;

// =========================================
async function confirmarTransaccion(pIdVenta: any) {

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_confirmar_transaccion " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_confirmar_transaccion(?)',[pIdVenta], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_confirmar_transaccion - err: " + err + " - result:" + result);
        
                    // res.status(400).json(err);
                    return;
                }
        
                console.log('result::: confirmarTransaccion ', result);
                return result;
                // res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_confirmar_transaccion 2 - " + error);
            // res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


}
