import { Request, Response } from 'express';
import pool from '../database';

class MarcasController {
// ==================================================
//        Lista
// ==================================================
public async listarMarcas(req: Request, res: Response): Promise<void> {


    pool.query(`call bsp_listar_marcas()`, function(err: any, result: any){
        if(err){
            console.log("error", err);
            return;
        }
        // res.json(result);

        res.status(200).json(result);
    })
}

}


const marcasController = new MarcasController;
export default marcasController;