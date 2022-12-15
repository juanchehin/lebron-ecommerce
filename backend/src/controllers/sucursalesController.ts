import { Request, Response } from 'express';
import pool from '../database';

class SucursalesController {

// ==================================================
//        Lista 
// ==================================================
public async listarTodasSucursales(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_sucursales()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}


}


const sucursalesController = new SucursalesController;
export default sucursalesController;