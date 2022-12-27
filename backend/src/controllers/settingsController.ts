import { Request, Response } from 'express';
// import mysqldump from 'mysqldump';
import keys from '../keys';
import pool from '../database';

const fs = require('fs');
const readline = require('readline');
// const { google } = require('googleapis');

class SettingsController {

// ==================================================
//        Lista todos los backups
// ==================================================

public async listarBackups(req: Request, res: Response): Promise<void> {

  var desde = req.query.desde || 0;

  pool.query(`call bsp_listar_backups('${desde}')`, function(err: any, result: any, fields: any){
      if(err){
          console.log("error", err);
          return;
      }
      res.json(result);
  })
}

// ==================================================
//        Lista 
// ==================================================

public async listarConfiguracionesEmpresa(req: Request, res: Response): Promise<void> {


  pool.query(`call bsp_dame_datos_empresa()`, function(err: any, result: any, fields: any){
      if(err){
          console.log("error", err);
          return;
      }
      res.status(200).json(result);
  })
}

// ==================================================
//        Lista 
// ==================================================

public async listarDatosFooter(req: Request, res: Response): Promise<void> {


  pool.query(`call bsp_listar_datos_footer()`, function(err: any, result: any, fields: any){
      if(err){
          res.status(400).json(err);
          return;
      }
      res.status(200).json(result);
  })
}
// ==================================================
//        update 
// ==================================================

public async actualizarConfiguraciones(req: Request, res: Response): Promise<void> {

  var pNombre = req.body[0] || '';
    var pCUIT = req.body[1] || '';
    var pEmail = req.body[2]|| '';
    var pImagen = req.body[3] || '';
    var pTelefono = req.body[4] || '';
    var pDireccion = req.body[5] || '';
    var pIngBrutos = req.body[6] || '';
    var pIVA = req.body[7] || 0;
    var pInstagram = req.body[8] || '';
    var pTwitter = req.body[9] || '';
    var pFacebook = req.body[10] || '';
    var pYoutube = req.body[11] || '';
    var pTarjeta1Pago = req.body[12] || '';
    var pTarjeta3Pago = req.body[13] || '';
    var pTarjeta6Pago = req.body[14] || '';
    var pCostoEnvio = req.body[15] || '';
    var pDolar = req.body[16] || '';
    var pRetencionMP = req.body[17] || '';


  pool.query(`call bsp_actualizar_configuraciones('${pNombre}','${pCUIT}','${pEmail}','${pImagen}','${pTelefono}','${pDireccion}',
            '${pIngBrutos}','${pIVA}','${pInstagram}','${pTwitter}','${pFacebook}','${pYoutube}','${pTarjeta1Pago}','${pTarjeta3Pago}',
            '${pTarjeta6Pago}','${pCostoEnvio}','${pDolar}','${pRetencionMP}')`, function(err: any, result: any, fields: any){
      if(err){
          res.status(400).json(err);
          return;
      }
      res.status(200).json(result);
  })
}

}

const settingsController = new SettingsController;
export default settingsController;