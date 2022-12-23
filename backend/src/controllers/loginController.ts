import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();
var SEED = process.env.JWT_KEY;
import pool from '../database';

const nodemailer = require("nodemailer");
import keys from '../keys';
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
// ==================================================
//       
// ==================================================
public async nuevaPassword(req: Request, res: Response): Promise<void> {

    var token = req.body[0];
    var nuevaPass = req.body[1];

    jwt.verify(token , SEED, (err: any,decoded: any) =>{

        if(err){
            return res.status(401).json({
                ok:false,
                mensaje: 'TOKEN incorrecto',
                errors: err
            });
        }
        // next();

    });

    var decoded = jwt.verify(token, SEED);
    var pIdPersona = decoded.IdPersona;

    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(nuevaPass, salt, async function(err: any, hash: any) {

            pool.query(`call bsp_nueva_pass_cliente('${pIdPersona}','${hash}')`, function(err: any, result: any, fields: any){        
                                
                if(err || result[0][0].Mensaje != 'Ok'){
                    return res.json({
                        ok: false,
                        Mensaje: 'Ocurrio un error, contactese con el administrador'
                    });
                }
                // =============Fin permisos=================
                return res.json({ Mensaje: 'Ok' });
            })

        });
    });

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
//  Renueva TOKEN
// ==========================================
public async recuperarClave(req: Request, res: Response): Promise<void> {
    
    // chequear que el email exista y la persona de ese mail exista
    var pEmail = req.params.pEmail;

    pool.query(`call bsp_recuperar_clave('${pEmail}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }

        if(result[0].Mensaje == 'Ok'){
            var token = jwt.sign({ IdPersona: result[0].vIdPersona }, SEED, { expiresIn: "1h"});

            enviarMailRecuperarClave(pEmail,token);
           
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
}

const loginController = new LoginController;
export default loginController;


// ==================================================
//   
// ==================================================

async function enviarMailRecuperarClave(pEmail: string,pToken: any) {

    const OAuth2_client = new OAuth2(keys.mail.client_id,keys.mail.client_secret);
    OAuth2_client.setCredentials({ refresh_token: keys.mail.refresh_token});
    const access_token = OAuth2_client.getAccessToken();
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: keys.mail.user, //your gmail account you used to set the project up in google cloud console"
        clientId: keys.mail.client_id,
        clientSecret: keys.mail.client_secret,
        refreshToken: keys.mail.refresh_token,
        accessToken: access_token //access token variable we defined earlier
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lebron - Suplementos Deportivos" <lebron@example.com>', // sender address
    to: pEmail, // list of receivers
    subject: "[Lebron] Recuperar clave!", // Subject line
    text: "Ingresa al siguiente link para recuperar tu contraseña", // plain text body
    html: "<a>" + process.env.URL_FRONT + "/recuperar-clave/"+ pToken + "</a>", // html body
  });

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
