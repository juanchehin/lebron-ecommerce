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

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    pool.query(`call bsp_listar_ventas_paginado_fechas('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
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
async altaVenta(req: Request, res: Response) {


    var pIdVendedor = req.params.IdPersona;
    var pIdVenta;

    var pIdCliente = req.body[0];
    var pLineaVenta = req.body[1];
    var pLineaTipoPago = req.body[2];
    var pMontoTotal = req.body[3];
    var pFechaVenta = req.body[4];

    // ==============================
    try {
        // ====================== Alta Venta ===========================================
        let sql = `call bsp_alta_venta('${pIdVendedor}','${pIdCliente}','${pMontoTotal}','${pFechaVenta}')`;
        const [result] = await pool.promise().query(sql)
        
        if(result[0][0].Mensaje != 'Ok')
        {
            logger.error("Error bsp_alta_venta - altaVenta - ventasController");

        }       
        // ========================== Lineas de venta =======================================

        pLineaVenta.forEach(async function (value: any) {

            let sql2 = `call bsp_alta_linea_venta('${result[0][0].IdVenta}','${value.IdProductoSabor}','${result[0][0].pIdSucursal}','${value.Cantidad}')`;
            const [result2] = await pool.promise().query(sql2)

            if(result2[0][0].Mensaje != 'Ok')
            {
                logger.error("Error bsp_alta_linea_venta - ventasController");
            }
        });


        // ====================== Tipos de pago ===========================================
        pLineaTipoPago.forEach(async function (value: any) {
             
            let sql3 = `call bsp_alta_tipo_pago('${result[0][0].IdVenta}','${value.IdTipoPago}','${value.SubTotal}','${pIdCliente}')`;
            const [result3, ] = await pool.promise().query(sql3)

               if(result3[0][0].Mensaje != 'Ok')
               {
                    logger.error("Error bsp_alta_tipo_pago - ventasController");
                   return
               }              

        });

        pIdVenta = result[0][0].IdVenta;

        // ======================= Confirmar transferencia exitosa ==========================================
      

        // return result
      } catch (error) {
        logger.error("Error funcion altaVenta - ventasController");
        res.status(404).json({ "error" : error});
        return;
      }
      res.json({"mensaje": await confirmarTransaccion(pIdVenta)});
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
}


const ventasController = new VentasController;
export default ventasController;

async function confirmarTransaccion(pIdVenta: any) {

    // ==============================
    try {
        let sql4 = `call bsp_confirmar_transaccion('${pIdVenta}')`;
        const [result4] = await pool.promise().query(sql4)
        
        return result4;

    } catch (error) {
        logger.error("Error funcion confirmarTransaccion - ventasController : " + error);
        return error;
      }

}
