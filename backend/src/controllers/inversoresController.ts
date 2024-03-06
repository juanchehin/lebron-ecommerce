import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class InversoresController {


// ==================================================
//        Lista Clientes desde cierto valor
// ==================================================
public async buscarInversoresPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.IdPersona;
    var inversorBuscado: any = req.params.inversorBuscado;
    
    if(inversorBuscado == '0' || inversorBuscado == 0)
    {
        inversorBuscado = "todosInversores";
    }

    //
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_buscar_inversores_paginado " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_buscar_inversores_paginado(?,?,?)',[pIdPersona,inversorBuscado,desde], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_buscar_inversores_paginado - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_buscar_inversores_paginado - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_inversores_paginado 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

 }

// ==================================================
//        Lista 
// ==================================================
public async listarTodosInversores(req: Request, res: Response): Promise<void> {

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_inversores " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_listar_inversores()', function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_listar_inversores - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_listar_inversores - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_inversores 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });
}

// ==================================================
//        Inserta 
// ==================================================
public async altaInversor(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var DNI = req.body[2];
    var Telefono = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];
    var fecha_nac = req.body[5];
    
    if(fecha_nac == 'NULL' || fecha_nac == null)
    {
        fecha_nac = null;
    }

    if(DNI == 'NULL' || DNI == null)
    {
        DNI = '-';
    }

    if(Telefono == 'NULL' || Telefono == null)
    {
        Telefono = '-';
    }

    if(Observaciones == 'NULL' || Observaciones == null)
    {
        Observaciones = '-';
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_inversor " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_alta_inversor(?,?,?,?,?,?,?,?)',[IdUsuario,Apellidos,Nombres,DNI,Telefono,Email,fecha_nac,Observaciones], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_inversor - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_alta_inversor - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_inversor 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}
// ==================================================
//        da de baja un inversor 
// ==================================================
public async bajaInversor(req: Request, res: Response): Promise<void> {
    
    var IdInversor = req.params.pIdInversor;
    var IdUsuario = req.params.IdPersona;

    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_baja_inversor " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_baja_inversor(?,?)',[IdUsuario,IdInversor], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_baja_inversor - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_baja_inversor - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_baja_inversor 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}


// ==================================================
//        Edita un inversor
// ==================================================
public async editarInversor(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona; // Usuario que realiza la transaccion

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var CUIL = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];
    var IdInversor = req.body[6];

    if(Email == 'NULL' || Email == null)
    {
        Email = '-';
    }

    if(Observaciones == 'NULL' || Observaciones == null)
    {
        Observaciones = '-';
    }

      
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_editar_inversor " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_editar_inversor(?,?,?,?,?,?,?,?)',[IdUsuario,IdInversor,Apellidos,Nombres,Telefono,CUIL,Email,Observaciones], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_editar_inversor - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_editar_inversor - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_editar_inversor 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//   
// ==================================================
public async cargarDatosFormEditarInversor(req: Request, res: Response): Promise<void> {

    const { pIdInversor } = req.params;
    const { IdPersona } = req.params;
    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_dame_datos_form_editar_inversor " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_dame_datos_form_editar_inversor(?,?)',[IdPersona,pIdInversor], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_dame_datos_form_editar_inversor - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_dame_datos_form_editar_inversor - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_dame_datos_form_editar_inversor 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        Lista los ingresos
// ==================================================

public async listarHistoricoInversor(req: Request, res: Response): Promise<void> {

    var pIdPersona = req.params.IdPersona;
    var pIdInversor = req.params.IdInversor;

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;
    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_transacciones_inversor_paginado_fechas " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_listar_transacciones_inversor_paginado_fechas(?,?,?,?,?)',[pIdPersona,pIdInversor,FechaInicio,FechaFin,desde], function(err: any, result: any){
                console.log('result::: ', result);
                console.log('err::: ', err);

                if(err){
                    logger.error("Error en bsp_listar_transacciones_inversor_paginado_fechas - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_transacciones_inversor_paginado_fechas 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });



}

// ==================================================
//   
// ==================================================
public async alta_inversion(req: Request, res: Response) {

    var pIdPersona = req.params.IdPersona;
    
    const file = req.file;
    const nombre_comprobante = file?.filename;

    var pIdInversor = req.body.id_inversor;
    var pFechaInversion = req.body.fecha_alta_inversion;
    var pMontoInvertido = req.body.monto_inversion;
    var pObservaciones = req.body.observaciones_alta_inversion;
    var moneda_inversion = req.body.moneda_inversion;
    var tasa_inversion = req.body.tasa_inversion;


    if(pObservaciones == 'NULL' || pObservaciones == null)
    {
        pObservaciones = '-';
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_inversion " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_alta_inversion(?,?,?,?,?,?,?,?)',[pIdPersona,pIdInversor,pMontoInvertido,moneda_inversion,tasa_inversion,pFechaInversion,pObservaciones,nombre_comprobante], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_inversion - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_alta_inversion - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_inversion 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


}


// ==================================================
//   
// ==================================================
public async bajaMontoInversor(req: Request, res: Response) {

    var pIdPersona = req.params.IdPersona;
    console.log('req.body::: ', req.body);

    var pIdInversor = req.body[0];
    var pFechaInversion = req.body[1];
    var pMontoInvertido = req.body[2];
    var pObservaciones = req.body[3];
    var moneda_inversion = req.body[4];


    if(pObservaciones == 'NULL' || pObservaciones == null)
    {
        pObservaciones = '-';
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_baja_monto_inversion " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_baja_monto_inversion(?,?,?,?,?,?)',[pIdPersona,pIdInversor,pMontoInvertido,moneda_inversion,pFechaInversion,pObservaciones], function(err: any, result: any){
                console.log('result::: ', result);
                console.log('err::: ', err);

                if(err){
                    logger.error("Error en bsp_baja_monto_inversion - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_baja_monto_inversion - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_baja_monto_inversion 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

}


const inversoresController = new InversoresController;
export default inversoresController;