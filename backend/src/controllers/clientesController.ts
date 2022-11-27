import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
import keys from '../keys';
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// const path = require('path');

class ClientesController {

    
 // ==================================================
//        Lista los roles del sistema
// ==================================================

public async listarRoles(req: Request, res: Response): Promise<void> {
     const roles = await pool.query('call bsp_listar_roles()');

     res.json(roles);
 }

// ==================================================
//        Obtiene un cliente de la BD
// ==================================================
public async dameDatosCliente(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: "La personas no existe" });
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        Inserta un cliente enviando un correo de confirmacion
// ==================================================
public async altaCliente(req: Request, res: Response) {

    var Email = req.body[0];
    var Password = req.body[1];
    var Apellidos = req.body[2];
    var Nombres = req.body[3];
    
    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(Password, salt, async function(err: any, hash: any) {
            
            pool.query(`call bsp_alta_cliente('${Apellidos}','${Nombres}','${hash}','${Email}')`, function(err: any, result: any, fields: any){
                
                if(err){
                    res.status(404).json({ text: "Ocurrio un problema" });
                    return;
                }
                
                if(result[0][0].Mensaje === 'La persona ya se encuentra cargada'){
                    return res.json({
                        Mensaje: result[0][0].Mensaje,
                        pIdPersona: result[1][0].IdPersona
                    });
                }                

                if(result[0][0].Mensaje !== 'Ok'){
                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
                
                enviarMailBienvenida(Email);
                
                return res.json({ Mensaje: 'Ok' });
            })

            
        });
    });

    

}

// ==================================================
//        Inserta una direccion
// ==================================================
public async altaDireccionCliente(req: Request, res: Response) {

    var IdLocalidad = req.body[0];
    var IdCliente = req.body[1];
    var Calle = req.body[2];
    var Numero = req.body[3];
    var Piso = req.body[4];
    var Departamento = req.body[5];
    var Referencia = req.body[6];
    var Telefono = req.body[7];
    
    pool.query(`call bsp_alta_direccion_cliente('${IdLocalidad}','${IdCliente}','${Calle}','${Numero}','${Piso}','${Departamento}','${Referencia}','${Telefono}')`, 
    function(err: any, result: any, fields: any){
        
                if(err){
                    res.status(404).json(err);
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
//   Activa un cliente (caso de ya existencia en la BD)
// ==================================================


public async activarCliente(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    const result: any = await pool.query('CALL bsp_activar_cliente(?)',IdPersona);

    if(result[0][0].Mensaje !== 'Ok'){
        return res.json({
            ok: false,
            mensaje: result[0][0].Mensaje
        });
    }

    return res.json({ Mensaje: 'Ok' });

}


// ==================================================
//        Lista Clientes desde cierto valor
// ==================================================

public async listarClientesPaginado(req: Request, res: Response): Promise<void> {
     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_clientes_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(result);
            return;
        }
        res.status(200).json(result);
    })
 }

 
 // ==================================================
//        Lista Clientes desde cierto valor
// ==================================================

public async dameDatosClienteEnvio(req: Request, res: Response): Promise<void> {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_direccion_cliente_costo('${IdPersona}')`, function(err: any, result: any, fields: any){
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

public async dameDirecionesCliente(req: Request, res: Response): Promise<void> {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_direcciones_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
           console.log("error", err);
           return;
       }
       res.json(result);
   })
}
// ==================================================
//   Elimina un cliente de la BD
// ==================================================

public async eliminarCliente(req: Request, res: Response) {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_eliminar_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                mensaje: result.Mensaje
            });
        }
    
        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//        Edita un cliente
// ==================================================


public async actualizaCliente(req: Request, res: Response) {

    var IdPersona = req.body.IdPersona;
    var IdTipoDocumento = req.body.IdTipoDocumento;
    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var Documento = req.body.Documento;
    var Password = req.body.Password;
    var Telefono = req.body.Telefono;
    var Sexo = req.body.Sexo;
    var Observaciones = req.body.Observaciones;
    var FechaNac = req.body.FechaNac;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;
    var Calle = req.body.Calle;
    var Piso = req.body.Piso;
    var Departamento = req.body.Departamento;
    var Ciudad = req.body.Ciudad;
    var Pais = req.body.Pais;
    var Numero = req.body.Numero;    // 20
    var Objetivo = req.body.Objetivo;
    var Ocupacion = req.body.Ocupacion;
    var Horario = req.body.Horario;

    pool.query(`call bsp_editar_cliente('${IdPersona}','${IdTipoDocumento}','${Apellidos}','${Nombres}',
    '${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}',
    '${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},
    '${Objetivo}','${Ocupacion}','${Horario}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "Ocurrio un problema" });
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
//        
// ==================================================
public async buscarCliente(req: Request, res: Response): Promise<any> {
    var clienteBuscado = req.params.clienteBuscado;

    pool.query(`call bsp_buscar_cliente('${clienteBuscado}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: "La personas no existe" });
            return;
        }
        
        res.status(200).json(result[0]);
    })

}
}


const clientesController = new ClientesController;
export default clientesController;



// ==================================================
//   
// ==================================================

async function enviarMailBienvenida(pEmail: string) {

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
    subject: "[Lebron] ¡Bienvenido!", // Subject line
    text: "Gracias por crear una cuenta en Lebron", // plain text body
    html: "<b>Gracias por crear una cuenta en Lebron</b>", // html body
  });

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
