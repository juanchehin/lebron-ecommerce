import { Request, Response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

class DireccionesController {

// ==================================================
//        Lista 
// ==================================================
public async buscarPorCP(req: Request, res: Response): Promise<void> {
    var cp = req.params.pCP;

    if(cp.toString().length != 4){
        res.status(401).json({
            ok: true,
            mensaje : 'CP invalido'
        });
        return;
    }

    pool.query(`call bsp_dame_provincia_localidad_cp('${cp}')`, function(err: any, result: any){
        if(err){
            res.status(500).json({
                ok: true,
                mensaje : 'Ocurrio un problema, contactese con el administrador'
            });
            return;
        }
        res.status(200).json(result);
    })
}




}


const direccionesController = new DireccionesController;
export default direccionesController;