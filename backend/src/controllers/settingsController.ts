import { Request, Response } from 'express';
import mysqldump from 'mysqldump';
import keys from '../keys';
import pool from '../database';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

class SettingsController {

// ==================================================
//      Nuevo Backup
// ==================================================
public async backup(req: Request, res: Response) {

    let dateTime = new Date();
    let nameBackup = `movi-${dateTime.toISOString().slice(0, 10)}.sql`;
    var dir: any;

    try{
     // Agrego el registro a la BD
     pool.query(`call bsp_alta_backup('${nameBackup}')`, function(err: any, result: any, fields: any){
      if(err){
          console.log("error", err);
          res.json({ Mensaje: 'Error' });
          return;
      }
    
      dir = `./backup/${result[0][0].Id}`;
    
        // Creo una carpeta con la fecha de hoy
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
        }
    
        // Creo y almaceno el backup de la BD
        mysqldump({
          connection: {
              host: keys.database.host,
              user: keys.database.user!,
              password: keys.database.password!,
              database: keys.database.database!,
          },
          dumpToFile: `${dir}/${nameBackup}`
        });

        // Creo el backup de las configuraciones
        pool.query(`call bsp_dame_config_db()`, function(err: any, result: any){
          if(err){
              console.log("error : ", err);
              res.json({ Mensaje: 'Error' });
              return;
          }
          
          fs.appendFile(`${dir}/MySQLCurrentSettings-${dateTime.toISOString().slice(0, 10)}.json`, JSON.stringify(result), function (err: any) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
        })
        res.json({ Mensaje: 'Ok' });
      })
    }
    catch{
        res.json({ Mensaje: 'Error' });
    }
}

// ==================================================
//       sinc
// ==================================================
public async sinc(req: Request, res: Response) {

  var name = req.params.name;
  var id = req.params.id;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
/**
 * Create an OAuth2 client with the given credentials, and then execute the given callback function.
*/
function authorize(credentials: any, callback: any) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err: any, token: any) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client: any, callback: any) {
      const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code: any) => {
          rl.close();
          oAuth2Client.getToken(code, (err: any, token: any) => {
              if (err) return console.error('Error retrieving access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
                  if (err) return console.error(err);
                  console.log('Token stored to', TOKEN_PATH);
              });
              callback(oAuth2Client);
          });
      });
  }
  /**
  * Describe with given media and metaData and upload it using google.drive.create method()
  */ 
  function uploadFile(auth: any) {
    const drive = google.drive({version: 'v3', auth});

    // For para recorrer la carpeta
    for (const file of fs.readdirSync(`./backup/${id}`)) {

      var name = `${file}`;

      const fileMetadata = {
        'name': name,
        parents: ['1YAsmVkpwKXwyrDd9SMx_gOF_jMfucYKm']
      };
      const media = {
        mimeType: 'text/sql',
        body: fs.createReadStream(`./backup/${id}/${file}`)
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, (err: any, file: any) => {
        if (err) {
          // Handle error
          console.error(err);
          res.json({ Mensaje: 'Error' });
          return;
        } else {
          console.log('File Id: ', file.id);
        }
      });
    }
  }
  
  fs.readFile('credentials.json', (err: any, content: any) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), uploadFile);
  });

  // Cargo un nuevo Backup en BD
  pool.query(`call bsp_backup_sinc('${id}')`, function(err: any, result: any, fields: any){
    if(err){
        console.log("error", err);
        res.json({ Mensaje: 'Error' });
        return;
    }
  })

  res.json({ Mensaje: 'Ok' });
      
}

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