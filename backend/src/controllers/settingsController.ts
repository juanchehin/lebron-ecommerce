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

}

const settingsController = new SettingsController;
export default settingsController;