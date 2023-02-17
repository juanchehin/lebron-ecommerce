import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class PedidosController {

// ==================================================
//        Lista pedidos
// ==================================================
public async listarPedidosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var fecha = req.params.pFecha

    pool.query(`call bsp_listar_pedidos_paginado('${desde}','${fecha}')`, function(err: any, result: any, fields: any){
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

    pool.query(`call bsp_entregar_pedido('${pIdPedido}','${pIdUsuario}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error en confirmarPedido - pedidosController " + err);

            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

}


const pedidosController = new PedidosController;
export default pedidosController;