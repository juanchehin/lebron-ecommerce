import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ProveedoresController {

// ==================================================
//        Lista 
// ==================================================
public async listarProveedoresPaginado(req: Request, res: Response): Promise<void> {
    var IdUsuario = req.params.IdPersona;

    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_proveedores_paginado('${IdUsuario}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de usuarios en panel
// ==================================================
public async buscarProveedoresPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_proveedores_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en bsp_buscar_proveedores_paginado - ProveedoresController");

            res.status(400).json(err);
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

    var IdUsuario = req.params.IdPersona;

    var Proveedor = req.body[0];
    var CUIL = req.body[1];
    var Telefono = req.body[2];
    var Observaciones = req.body[3];
    var Apellidos = req.body[4];
    var Nombres = req.body[5];
    var Email = req.body[6];

    pool.query(`call bsp_alta_proveedor('${IdUsuario}','${Proveedor}','${CUIL}','${Telefono}','${Apellidos}','${Nombres}','${Email}','${Observaciones}')`, function(err: any, result: any, fields: any){
        
        if(err){
            logger.error("Error en altaProveedor - bsp_alta_proveedor - proveedoresController");

            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en altaProveedor - bsp_alta_proveedor - proveedoresController");

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


// ==================================================
//        Edita un proveedor
// ==================================================
public async editarProveedor(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona; // Usuario que realiza la transaccion

    var IdProveedor = req.body[0];
    var Proveedor = req.body[1];
    var Apellidos = req.body[2];
    var Nombres = req.body[3];
    var Telefono = req.body[4];
    var CUIL = req.body[5];
    var Email = req.body[6];
    var Observaciones = req.body[7];

    pool.query(`call bsp_editar_proveedor('${IdUsuario}','${IdProveedor}','${Proveedor}','${Apellidos}','${Nombres}','${Telefono}','${CUIL}','${Email}','${Observaciones}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en editarProveedor - bsp_editar_proveedor - proveedoresController");

            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en editarProveedor - bsp_editar_proveedor - proveedoresController");

            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormEditarProveedor(req: Request, res: Response): Promise<void> {

    const { pIdProveedor } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_proveedor('${IdPersona}','${pIdProveedor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

}


const proveedoresController = new ProveedoresController;
export default proveedoresController;