import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
import keys from '../keys';

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
    let datos: any;

    pool.query(`call bsp_dame_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: "La personas no existe" });
        }
        
        datos = result[0]
    })

}

// ==================================================
//        Inserta un cliente
// ==================================================
public async altaCliente(req: Request, res: Response) {

    var Email = req.body[0];
    var Password = req.body[1];
    var Apellidos = req.body[2];
    var Nombres = req.body[3];
    
    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(Password, salt, function(err: any, hash: any) {
            
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

                    // enviarMailConfirmacion(Email);

                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
        
                return res.json({ Mensaje: 'Ok' });
            })
        });
    });

    

}

// ==================================================
//   
// ==================================================

public async enviarMailConfirmacion(pEmail: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: keys.mail.host,
    port: keys.mail.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: keys.mail.user, // generated ethereal user
      pass: keys.mail.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <lebron@example.com>', // sender address
    to: pEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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

public async listarClientes(req: Request, res: Response): Promise<void> {
     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_clientes_estado('${desde}')`, function(err: any, result: any, fields: any){
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

}


const clientesController = new ClientesController;
export default clientesController;