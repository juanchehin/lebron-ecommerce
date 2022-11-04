import { Request, Response } from 'express';
var fs = require('fs');
import pool from '../database';
const path = require('path');

class CajaController {
// ==================================================
//  Lista los movimientos de un cierto cliente
// ==================================================

public async dameMovimientosClientes(req: Request, res: Response): Promise<void> {
        const id = req.query.id;
        const desde = req.query.desde;
        
        pool.query(`call bsp_movimientos_cliente('${id}','${desde}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            res.json(result);
        })
}
    

// ==================================================
//        Lista las transacciones
// ==================================================

public async list(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    pool.query(`call bsp_listar_transacciones('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })

 }
// ======================================================================================================================
// ================================= INGRESOS ==========================================================================
// ======================================================================================================================


// ==================================================
//        Lista los ingresos
// ==================================================

public async listarIngresos(req: Request, res: Response): Promise<void> {

     var desde = req.params.desde || 0;
     desde  = Number(desde);

     var FechaInicio = req.params.FechaInicio;
     var FechaFin = req.params.FechaFin;

     pool.query(`call bsp_listar_ingresos('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })

 }

// ==================================================
//        Inserta un ingreso
// ==================================================


public async createIngreso(req: Request, res: Response) {

    var pIdPersona = req.body.IdPersona;
    var pIdPlan = req.body.IdPlan;
    var pCantidad = req.body.Cantidad;
    var pDescripcion = req.body.Detalle;

    pool.query(`call bsp_alta_ingreso('${pIdPersona}','${pIdPlan}','${pCantidad}','${pDescripcion}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            res.json({ message: result[0][0].Mensaje });
            console.log("Error en la transaccion ");
            return;
        }

        res.json({ Mensaje: 'Ok' });
    })

}
// ===========================================================================================================
// ================================ EGRESOS =================================================================
// ===========================================================================================================


// ==================================================
//        Lista los egresos - HACER PARA QUE SEA ENTRE FECHAS
// ==================================================
public async listarEgresos(req: Request, res: Response): Promise<void> {

     var desde = req.query.desde || 0;
     desde  = Number(desde);

     var FechaInicio = req.params.FechaInicio;
     var FechaFin = req.params.FechaFin;

     pool.query(`call bsp_listar_egresos('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })

 }

// ==================================================
//        Inserta un egreso
// ==================================================
public async createEgreso(req: Request, res: Response) {

    var Monto = req.body.Monto;
    var Cantidad = req.body.Cantidad;
    var Detalle = req.body.Detalle;
    var pIdPersona = req.body.IdPersona;

    pool.query(`call bsp_alta_egreso('${Monto}','${pIdPersona}','${Cantidad}','${Detalle}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        
        res.json({ Mensaje: 'Ok' });
    })

}

}

const cajaController = new CajaController;
export default cajaController;