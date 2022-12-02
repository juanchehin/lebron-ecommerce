var jwt = require('jsonwebtoken');
var SEED = process.env.JWT_SECRET;

import { Request, Response, NextFunction } from 'express';


// ==================================================
//        TOKEN - importa el orden
// ==================================================

exports.verificaToken = function(req: Request,res:Response,next: NextFunction){
var token = req.headers.token;

jwt.verify(token , SEED, (err: any,decoded: any) =>{

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
//        Verifica si es ADMIN
// ==================================================

exports.verificaAdmin = function(req: Request,res:Response,next: NextFunction){

    var IdRol = req.query.IdRol;

    if(IdRol === '3'){
        // Es un ADMIN y todo esta bien
        next();
    } else {
        // No es un ADMIN
        // Manejar errores aqui, por que en el navegador se ese error en rojo
        return res.status(401).json({
                ok:false,
                mensaje: 'TOKEN incorrecto - No es ADMIN',
                errors: { messaje : 'No es ADMIN, no puede hacer eso'}
        });
    }

}

// ==================================================
//        Verifica si es ADMIN o Mismo usuario
// ==================================================

exports.MismoUsuario = function(req: Request,res:Response,next: NextFunction){

    var token = req.headers.token;
    // var persona = req.body.persona;
    var IdPersona = req.params.IdPersona;

    var decoded = jwt.verify(token, SEED);

    console.log("decoded : ",decoded)

    // IdPersona == token[0] ?

    jwt.verify(token , SEED, (err: any,decoded: any) =>{

        if(err){
            return res.status(401).json({
                ok:false,
                mensaje: 'TOKEN incorrecto',
                errors: err
            });
        }
        next();
    
    });



    // if(persona.Rol === 'Profesional' || persona.IdPersona === id){
    //     // Es un ADMIN y todo esta bien
    //     next();
    //     // return;
    // } else {
    //     // No es un ADMIN
    //     console.log('NO Eres un ADMIN !!!');
    //     return res.status(401).json({
    //             ok:false,
    //             mensaje: 'TOKEN incorrecto ',
    //             errors: { messaje : 'false'}
    //         });
    // }

}