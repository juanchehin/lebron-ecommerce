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

    pool.query(`call bsp_buscar_inversores_paginado('${pIdPersona}','${inversorBuscado}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
           res.status(404).json(result);
           return;
       }
       res.status(200).json(result);
    })

 }

// ==================================================
//        Lista 
// ==================================================
public async listarTodosInversores(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_inversores()`, function(err: any, result: any, fields: any){

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

    pool.query(`call bsp_baja_inversor('${IdUsuario}','${IdInversor}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}


// ==================================================
//        Edita un inversor
// ==================================================
public async editarInversor(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona; // Usuario que realiza la transaccion

    var IdInversor = req.body[0];
    var Inversor = req.body[1];
    var Apellidos = req.body[2];
    var Nombres = req.body[3];
    var Telefono = req.body[4];
    var CUIL = req.body[5];
    var Email = req.body[6];
    var Observaciones = req.body[7];

    pool.query(`call bsp_editar_inversor('${IdUsuario}','${IdInversor}','${Inversor}','${Apellidos}','${Nombres}','${Telefono}','${CUIL}','${Email}','${Observaciones}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en editarInversor - bsp_editar_inversor - inversoresController");

            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en editarInversor - bsp_editar_inversor - inversoresController");

            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

// ==================================================
//   
// ==================================================
public async cargarDatosFormEditarInversor(req: Request, res: Response): Promise<void> {

    const { pIdInversor } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_inversor('${IdPersona}','${pIdInversor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
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
    console.log('req.params::: ', req.params);

    
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


    if(pObservaciones == 'NULL' || pObservaciones == null)
    {
        pObservaciones = '-';
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion alta_inversion " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_alta_inversion(?,?,?,?,?,?)',[pIdPersona,pIdInversor,pMontoInvertido,pFechaInversion,pObservaciones,nombre_comprobante], function(err: any, result: any){

                if(err){
                    logger.error("Error en alta_inversion - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en alta_inversion 2 - " + error);
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

    var pIdInversor = req.body[0];
    var pMonto = req.body[1];
    var pObservaciones = req.body[2];

    pool.query(`call bsp_baja_monto_inversion('${pIdPersona}','${pIdInversor}','${pMonto}','${pObservaciones}')`, function(err: any, result: any, fields: any){
        
        if(err){
            logger.error("Error en bajaMontoInversor - bsp_baja_monto_inversion - inversoresController");
            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en bajaMontoInversor - bsp_baja_monto_inversion - inversoresController");
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

}


const inversoresController = new InversoresController;
export default inversoresController;