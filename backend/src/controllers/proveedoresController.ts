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
//        Autocomplete prov
// ==================================================
public async buscar_proveedor_autocomplete(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pProductoBuscado || '';
    var pIdUsuario = req.params.IdPersona;
    
    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_buscar_proveedor_autocomplete " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_buscar_proveedor_autocomplete(?,?)',[pParametroBusqueda,pIdUsuario], function(err: any, result: any){

                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_buscar_proveedor_autocomplete - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
                
                if(err){
                    logger.error("Error en bsp_buscar_producto_autocomplete - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_producto_autocomplete 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

    // **

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

    
    if(Proveedor == null || Proveedor == 'null' || Proveedor == undefined || Proveedor == 'undefined')
    {
        Proveedor = '';
    }

    
    if(CUIL == null || CUIL == 'null' || CUIL == undefined || CUIL == 'undefined')
    {
        CUIL = '-';
    }

    
    if(Telefono == null || Telefono == 'null' || Telefono == undefined || Telefono == 'undefined')
    {
        Telefono = '-';
    }

    if(CUIL == null || CUIL == 'null' || CUIL == undefined || CUIL == 'undefined')
    {
        CUIL = '-';
    }

    if(Email == null || Email == 'null' || Email == undefined || Email == 'undefined')
    {
        Email = '-';
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bajaProveedor " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_alta_proveedor(?,?,?,?,?,?,?,?)',[IdUsuario,Proveedor,CUIL,Telefono,Apellidos,Nombres,Email,Observaciones], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_proveedor - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_proveedor 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


}
// ==================================================
//        da de baja un proveedor 
// ==================================================
public async bajaProveedor(req: Request, res: Response): Promise<void> {
    
    var IdProveedor = req.params.pIdProveedor;
    var IdUsuario = req.params.IdPersona;
    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bajaProveedor " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_baja_proveedor(?,?)',[IdUsuario,IdProveedor], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_baja_proveedor - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_baja_proveedor 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

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