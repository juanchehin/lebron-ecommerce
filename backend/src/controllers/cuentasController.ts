import { Request, Response } from 'express';
import pool from '../database';

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

    pool.query(`call bsp_buscar_clientes_paginado('${pIdPersona}',4,'${pIdPersona},'${desde}')`, function(err: any, result: any, fields: any){
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
public async confirmarPedido(req: Request, res: Response): Promise<void> {

    var pIdPedido = req.body[0];
    var pIdUsuario = req.body[1];

    pool.query(`call bsp_confirmar_pedido('${pIdPedido}','${pIdUsuario}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

}


const cuentasController = new CuentasController;
export default cuentasController;