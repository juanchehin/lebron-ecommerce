import { Request, Response } from 'express';

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

import pool from '../database';

class LoginController {

// ========================================================
// Login - usuario del sistema
// ========================================================

public async loginUsuario(req: Request, res: Response){

    const email = req.body[0];
    const pass = req.body[1];
// 
pool.query(`call bsp_login_usuario('${email}')`, function(err: any, resultLogin: string | any[]){
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
            var token = jwt.sign({ usuario: email }, SEED, { expiresIn: 14400});
            
            menu = resultLogin[1];
            
            // Respuesta
            res.status(200).json({
                ok: true,
                usuario: resultLogin[0][0].lUsuario,
                IdRol: resultLogin[0][0].lIdRol,
                token: token,
                IdPersona: resultLogin[0][0].lIdPersona,
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
            var token = jwt.sign({ usuario: email }, SEED, { expiresIn: 14400});
            
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

}

const loginController = new LoginController;
export default loginController;