import { Request, Response } from 'express';
import pool from '../database';

class ProveedoresController {

// ==================================================
//        Lista 
// ==================================================
public async listarProveedoresPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_proveedores_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista 
// ==================================================
public async listarTodosProveedores(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_proveedores()`, function(err: any, result: any, fields: any){

        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}
}


const proveedoresController = new ProveedoresController;
export default proveedoresController;