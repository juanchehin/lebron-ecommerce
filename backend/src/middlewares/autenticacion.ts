var jwt = require('jsonwebtoken');
require("dotenv").config();
var SEED = process.env.JWT_KEY;
import pool from '../database';

import { Request, Response, NextFunction } from 'express';


// ==================================================
//        TOKEN - importa el orden
// ==================================================

exports.verificaToken = function(req: Request,res:Response,next: NextFunction){

var token = req.headers.token;

jwt.verify(token , SEED, (err: any) =>{

    if(err){
        return res.status(401).json({
            ok:false,
            mensaje: 'TOKEN incorrecto',
            errors: err
        });
    }
    next();

});

}

// ==================================================
//        Verifica si es ADMIN o Mismo usuario
// ==================================================

exports.MismoUsuario = function(req: Request,res:Response,next: NextFunction){

    var IdPersonaParam = req.params.IdPersona;
    var token = req.headers.token;
    var decoded = jwt.verify(token, SEED);
    var IdPersona = decoded.IdPersona;

    // Pudo haberse modificado el valor en el localstorage del cliente
    if(IdPersona != IdPersonaParam){       
        console.log("auntenticacion.ts , no coinciden los IdPersona")
        pool.query(`call bsp_alta_log('${IdPersona}',"TOKEN incorrecto - Chequear usuario",'productosController','','exports.MismoUsuario','El id usuario por parametro no coincide con el id usuario del token, pudo haber modificado el localstorage')`, function(err: any, result: any){               
            if(err){
                return;
            }
        })
        return res.status(401).json({
            ok:false,
            mensaje: 'TOKEN incorrecto - Chequear usuario'
        });
    }
    next();

}