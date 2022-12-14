import { Request, Response } from 'express';
import pool from '../database';

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
altaVenta(req: Request, res: Response) {

    var pIdCliente = req.body[0];
    var pLineaVenta = req.body[1];
    var pLineaTipoPago = req.body[2];
    var pMontoTotal = req.body[3];
    var pIdVendedor = req.params.IdPersona;

    console.log("reqp ",req.body)

    pool.query(`call bsp_alta_venta('${pIdVendedor}','${pIdCliente}','${pMontoTotal}')`, function(err: any, result: any){

        console.log("err es : ",err)
        console.log("result es : ",result)
       if(err){
            res.status(404).json(err);
           return;
       }      

       // ==============================
       if(result[0][0].Mensaje == 'Ok')
       {

            pLineaVenta.forEach(function (value: any) {

                console.log("value 2 es : ",value)

                pool.query(`call bsp_alta_linea_venta('${result[0][0].IdVenta}','${value.IdProductoSabor}','${result[0][0].pIdSucursal}','${value.Cantidad}')`, function(err: any, result2: any){
                    console.log("err 2 es : ",err)
        console.log("result 2 es : ",result2)

                    if(err || result2[0][0].Mensaje != 'Ok'){
                        res.status(404).json(err);
                        return;
                    }
                    
                    // ==============================
                    if(result2[0][0].Mensaje == 'Ok')
                    {             
                        pLineaTipoPago.forEach(function (value: any) {
             
                             pool.query(`call bsp_alta_tipo_pago('${result[0][0].IdVenta}','${value.IdTipoPago}','${value.SubTotal}','${pIdCliente}')`, function(err: any, result3: any){
                                console.log("err 3 es : ",err)
        console.log("result 3 es : ",result3)

                                if(err){
                                    // res.send(err);
                                     return;
                                 }

                                 res.send(result3);
                             })
                         });
                     }
                    // =============================
                    // res.json(result);
                })
            });
        }
        else
        {
            res.status(500).json(result);
           return;
        }
        // ==============================
   })

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