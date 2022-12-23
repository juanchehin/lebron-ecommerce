import { Request, Response } from 'express';
import pool from '../database';

class ComprasController {


// ==================================================
//        Lista los ingresos
// ==================================================

public async listarCompras(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_listar_compras_paginado_fechas('${IdPersona}','${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
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
altaCompra(req: Request, res: Response) {

    var pIdProveedor = req.body[0];
    var pLineasCompras = req.body[1];
    var pMontoTotal = req.body[2];
    var pIdComprador = req.params.IdPersona;

    console.log("req.body : ",req.body)

    pool.query(`call bsp_alta_compra('${pIdComprador}','${pIdProveedor}','${pMontoTotal}')`, function(err: any, result: any){

        console.log("result : ",result)
        console.log("err : ",err)

       if(err){
            res.status(404).json(err);
           return;
       }      

       // ==============================
       if(result[0][0].Mensaje == 'Ok')
       {

        pLineasCompras.forEach(function (value: any) {

            console.log("value : ",value)

                pool.query(`call bsp_alta_linea_compra('${result[0][0].IdCompra}','${value.IdProducto}','${value.Cantidad}')`, function(err: any, result2: any){
                    
                    console.log("err : ",err)
                    console.log("result2 : ",result2)
                    if(err){
                        res.send(err);
                        return;
                    }
                    
                })
                
            });
        }
        // ==============================
        res.send({ Mensaje: 'Ok'});
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
}


const comprasController = new ComprasController;
export default comprasController;