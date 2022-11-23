import { Request, Response } from 'express';
import pool from '../database';

class MarcasController {
// ==================================================
//        Lista marcas
// ==================================================
public async listarMarcasPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_marcas_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista marcas par header
// ==================================================
public async listarMarcas(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_marcas()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

}


const marcasController = new MarcasController;
export default marcasController;