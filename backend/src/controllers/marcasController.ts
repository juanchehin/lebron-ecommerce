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
    
    pool.query(`call bsp_dame_marcas_home()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Inserta 
// ==================================================
public async altaMarca(req: Request, res: Response) {

    var pMarca = req.body[0];
    var pDescripcion = req.body[1];

    pool.query(`call bsp_alta_marca('${req.params.IdPersona}','${pMarca}','${pDescripcion}')`, async function(err: any, result: any, fields: any){

        if(err || result[0][0].Mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}


}


const marcasController = new MarcasController;
export default marcasController;