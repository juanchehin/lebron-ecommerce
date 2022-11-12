import { Request, Response } from 'express';
import pool from '../database';

class ProductosController {
// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async listarProductosPromocion(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_productos_promocion('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

}


const productosController = new ProductosController;
export default productosController;