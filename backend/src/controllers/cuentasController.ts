import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class CuentasController {

// ==================================================
//        Lista
// ==================================================
public async listarCuentasPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.IdPersona;
    var clienteBuscado: any = req.params.clienteBuscado;
    
    if(clienteBuscado == '0' || clienteBuscado == 0)
    {
        clienteBuscado = "todosClientes";
    }

    pool.query(`call bsp_buscar_clientes_paginado('${pIdPersona}','4','${clienteBuscado}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

 

// ==================================================
//       
// ==================================================
public async cargarMovimientosClienteCuenta(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdUsuario = req.params.IdPersona;
    var pIdCliente = req.params.pIdCliente;    

    pool.query(`call bsp_listar_movimientos_cuenta('${pIdUsuario}','${desde}','${pIdCliente}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//      
// ==================================================
altaAcreditarCliente(req: Request, res: Response) {
    
    var pIdCliente = req.body[0].IdCliente;
    var pMonto = req.body[0].monto;
    var pDescripcion = req.body[0].descripcion;

    var pIdUsuario = req.params.IdPersona;


    pool.query(`call bsp_alta_acreditar_cliente('${pIdUsuario}','${pIdCliente}','${pMonto}','${pDescripcion}')`, function(err: any, result: any){

       if(err){
            logger.error("Error en altaAcreditarCliente - CuentasController " + err );

            res.status(404).json(err);
           return;
       }      
        res.send({ Mensaje: 'Ok'});
   })

}
}


const cuentasController = new CuentasController;
export default cuentasController;