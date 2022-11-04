import { Request, Response } from 'express';

var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

import pool from '../database';

class LoginController {

// ========================================================
// Login
// ========================================================

public async login(req: Request, res: Response){

    const email = req.body.Correo;
    const pass = req.body.Password;
// 
pool.query(`call bsp_dame_persona_correo_pass('${email}','${pass}')`, function(err: any, result: string | any[]){
    var menu: any = [];

    if(err){
        // res.send({ err:'err' })
        console.log("err es : ",err);
    }

    //
    if(result[0][0].Mensaje !== 'Ok' || null){
        console.log('Error de credenciales');
        
        // Quitar esto para produccion
        res.json({
            ok: true,
            mensaje : 'Error de credenciales'
        });  
        return;
    }

    
    var token = jwt.sign({ usuario: email }, SEED, { expiresIn: 14400});
    
    //   IdRol 1 - Clientes
    if(result[0][0].IdRol === 1) {
    
        menu = [
                    { titulo: 'Mis mediciones', url: '/cliente/mediciones',icono :'format_list_bulleted' },
                    { titulo: 'Mis asistencias', url: '/cliente/asistencias',icono :'assignment_turned_in' },
                    { titulo: 'Mis graficas', url: '/cliente/graficas',icono :'insert_chart_outlined' }
                ]
    
                // Se ejecuta una actualizacion de cliente cada vez que accede de forma exitosa, verifica la cantidad de clases
                // su estado , si tiene meses de credito , etc
                console.log('Justo antes de actualiza estado cliente y IdPeronsa es ',result[0][0].IdPersona);
                const respuesta = pool.query('call bsp_actualiza_estado_cliente(?)',result[0][0].IdPersona);
                console.log('respuesta de actualiza es : ',respuesta);
    }

    // IdRol 3 - Administrador
    if(result[0][0].IdRol === 3) {
        
        menu = [
                { titulo: 'Personal', url: '/mantenimiento/profesionales', icono :'group' },
                { titulo: 'Clientes', url: '/mantenimiento/clientes' , icono :'sports_kabaddi'},
                { titulo: 'Caja', url: '/cajas' , icono :'attach_money'},
                { titulo: 'Planes', url: '/mantenimiento/planes' , icono :'dehaze'},
                { titulo: 'Configuraciones', url: '/settings' , icono :'settings'}
            ]
    }
    
    //  IdRol 2 - Profesionales
    if(result[0][0].IdRol === 2) { 
        menu = 
        [
            { titulo: 'Clientes', url: '/mantenimiento/clientes' , icono :'group'},
            { titulo: 'Caja', url: '/cajas' , icono :'attach_money'}
        ]
    }
    
    // Respuesta
    res.status(200).json({
        ok: true,
        usuario: result[0][0].correo,
        IdRol: result[0][0].IdRol,
        token: token,    // <-- Devuelvo el token al front end
        id: result[0][0].IdPersona,
        menu: menu
    });
    
})


// Ahora genero el TOKEN con la libreria jwt
// var menu = this.obtenerMenu(result[0][0].IdRol)

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
    console.log(' req.params en actualizaEstadoCliente ', req.params);

    const IdPersona = req.params.IdPersona;
 }

}

const loginController = new LoginController;
export default loginController;