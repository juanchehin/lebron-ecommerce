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

// ==================================================
//        Inserta 
// ==================================================
public async altaProveedor(req: Request, res: Response) {

    var Proveedor = req.body[0];
    var CUIL = req.body[1];
    var Telefono = req.body[2];
    var Observaciones = req.body[3];
    var Apellidos = req.body[4];
    var Nombres = req.body[5];
    var Email = req.body[6];

    pool.query(`call bsp_alta_proveedor('${Proveedor}','${CUIL}','${Telefono}','${Apellidos}','${Nombres}','${Email}','${Observaciones}')`, function(err: any, result: any, fields: any){
        
        if(err){
            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}
// ==================================================
//        da de baja un proveedor 
// ==================================================
public async bajaProveedor(req: Request, res: Response): Promise<void> {
    
    var IdProveedor = req.params.pIdProveedor;
    var IdUsuario = req.params.IdPersona;

    pool.query(`call bsp_baja_proveedor('${IdUsuario}','${IdProveedor}')`, function(err: any, result: any, fields: any){
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