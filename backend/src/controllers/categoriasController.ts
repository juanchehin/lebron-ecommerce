import { Request, Response } from 'express';
import pool from '../database';

class CategoriasController {
// ==================================================
//        Lista
// ==================================================
public async listarCategoriasSubcategorias(req: Request, res: Response): Promise<void> {


    pool.query(`call bsp_listar_categorias_subcategorias()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }
        // res.json(result);

        res.status(200).json(result);
    })
}

// ==================================================
//    
// ==================================================
public async listarSubcategoriasPorIdCategoria(req: Request, res: Response): Promise<void> {
    var pIdCategoria = req.params.pIdCategoria || 0;
    
    pool.query(`call bsp_listar_subcategorias_idcat('${pIdCategoria}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }
        // res.json(result);

        res.status(200).json(result);
    })
}

}


const categoriasController = new CategoriasController;
export default categoriasController;