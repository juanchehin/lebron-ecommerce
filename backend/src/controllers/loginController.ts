import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();
var SEED = process.env.JWT_KEY;
var SEED_MAIL = process.env.JWT_KEY_MAIL;
import pool from '../database';

const nodemailer = require("nodemailer");
// import keys from '../keys';
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;

class LoginController {

// ========================================================
// Login - usuario del sistema
// ========================================================

public async loginUsuario(req: Request, res: Response){

    const email = req.body[0];
    const pass = req.body[1];
// 
pool.query(`call bsp_login_panel('${email}')`, function(err: any, resultLogin: string | any[]){
    var menu: any = [];

    if(err){
        res.status(401).json({
            ok: true,
            mensaje : 'Error de credenciales'
        });
    }
    // Chequeo la contraseña
    bcrypt.compare(pass, resultLogin[0][0].lPassword, function(err: any, result: any) {

        if(result != true || err){

            res.status(500).json({
                ok: true,
                mensaje : 'Ocurrio un problema, contactese con el administrador'
            });
            
            return;
        }
        else{ 
             // Creo el token
            var token = jwt.sign({ IdPersona: resultLogin[0][0].lIdPersona }, SEED, { expiresIn: 14400});
            
            menu = resultLogin[1];
            
            // Respuesta
            res.status(200).json({
                ok: true,
                IdPersona: resultLogin[0][0].lIdPersona,
                token: token,
                menu: menu
            });
        }
    });
   
    
})

}


// ========================================================
// Login - clientes
// ========================================================

public async loginCliente(req: Request, res: Response){

    const email = req.body[0];
    const pass = req.body[1];
// 
pool.query(`call bsp_login_cliente('${email}')`, function(err: any, resultLogin: string | any[]){

    if(err){
        res.status(401).json({
            ok: true,
            mensaje : 'Error de credenciales'
        });
        return;
    }

    // Chequeo la contraseña
    bcrypt.compare(pass, resultLogin[0][0].lPassword, function(err: any, result: any) {

        if(result != true){

            res.status(500).json({
                ok: true,
                mensaje : 'Ocurrio un problema, contactese con el administrador'
            });
            
            return;
        }
        else{ 
             // Creo el token
            var token = jwt.sign({ IdPersona: resultLogin[0][0].lIdPersona }, SEED, { expiresIn: 14400});
            
            // Respuesta
            res.status(200).json({
                ok: true,
                token: token,
                IdPersona: resultLogin[0][0].lIdPersona,
                cantItemsCarrito : resultLogin[1][0].cantItemsCarrito
            });
        }
    });
   
    
})

}

// ==========================================
//  Renueva TOKEN
// ==========================================
public async renuevatoken(req: Request, res: Response): Promise<void> {
    
    var body = req.body;    // Usuario y contraseña

    var token = jwt.sign({ usuario: body.correo }, SEED, { expiresIn: 14400});// 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

}
// ==================================================
//   Actualiza el estado de un cliente
// ==================================================
public async actualizaEstadoCliente(req: Request, res: Response): Promise<void> {

    const IdPersona = req.params.IdPersona;
 }

 // ==========================================
//  
// ==========================================
public async recuperarClave(req: Request, res: Response): Promise<void> {

    // chequear que el email exista y la persona de ese mail exista
    var pEmail = req.params.pEmail;

    pool.query(`call bsp_dame_id_por_email('${pEmail}')`, function(err: any, result: any, fields: any){

        if(err){
            res.status(404).json(err);
            return;
        }

        if(result[0][0].Mensaje == 'Ok'){
            var token = jwt.sign({ IdPersona: result[0][0].vIdPersona }, SEED_MAIL, { expiresIn: "1h"});

            pool.query(`call bsp_alta_token_recuperar_pass('${result[0][0].vIdPersona}','${token}')`, function(err: any, result: any, fields: any){        

                if(err || result[0][0].Mensaje != 'Ok'){
                    return res.json({
                        ok: false,
                        Mensaje: err
                    });
                }
            })

            enviarMailRecuperarClave(pEmail,token);

            // Envio de email exitoso
            return res.json({ Mensaje: 'Ok' });
           
        } 
        else{ 
            res.status(500).json({
                ok: true,
                mensaje : 'Ocurrio un problema, contactese con el administrador'
            });
            
            return;
        }
    })

}

// ==================================================
//       
// ==================================================
public async nuevaPassword(req: Request, res: Response): Promise<any> {

    var token = String(req.body[0]);
    var nuevaPass = req.body[1];

    try {
        var decoded = jwt.verify(String(token), SEED_MAIL);
        var IdPersona = decoded.IdPersona;
        // next();
    } catch(err) {
        return res.json({
            ok: false,
            Mensaje: err
        });
    }

    pool.query(`call bsp_checkear_token('${IdPersona}','${token}')`, function(err: any, result: any, fields: any){

        if(err || (result[0][0].Mensaje != 'Ok')){
            return res.json({
                ok: false,
                Mensaje: err
            });
        }
    })
   
    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(nuevaPass, salt, async function(err: any, hash: any) {

            pool.query(`call bsp_nueva_pass_cliente('${IdPersona}','${hash}','${token}')`, function(err: any, result: any, fields: any){        
                                
                if(err || result[0][0].Mensaje != 'Ok'){
                    return res.json({
                        ok: false,
                        Mensaje: err
                    });
                }
            })

        });
    });    

    return res.status(200).json({Mensaje : 'Ok'});

}
}

const loginController = new LoginController;
export default loginController;


// ==================================================
//   
// ==================================================

async function enviarMailRecuperarClave(pEmail: string,pToken: any) {

    // const OAuth2_client = new OAuth2(keys.mail.client_id,keys.mail.client_secret);
    // OAuth2_client.setCredentials({ refresh_token: keys.mail.refresh_token});
    // const access_token = OAuth2_client.getAccessToken();
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'lebron-suplementos.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lebron - Suplementos Deportivos" <administracion@lebron-suplementos.com>', // sender address
    to: pEmail, // list of receivers
    subject: "[Lebron] Recuperar clave!", // Subject line
    text: "Ingresa al siguiente link para recuperar tu contraseña", // plain text body
    html: "<a>" + process.env.URL_FRONT + "/nueva-pass/"+ pToken + "</a>", // html body
  });

}
