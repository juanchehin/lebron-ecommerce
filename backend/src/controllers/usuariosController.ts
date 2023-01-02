import { Request, Response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

class UsuariosController {
// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async listarUsuariosPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_usuarios_paginado('${req.params.IdPersona}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
}


// ==================================================
//        Inserta un usuario
// ==================================================
public async altaUsuario(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Usuario = req.body[2];
    var Correo = req.body[3];
    var Telefono = req.body[4];
    var DNI = req.body[5];
    var Password = req.body[6];
    var Observaciones = req.body[7];
    var FechaNac = req.body[8];
    var IdSucursal = req.body[9];
    var arrayPermisos = req.body[10];

    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(Password, salt, async function(err: any, hash: any) {            

            pool.query(`call bsp_alta_usuario('${IdUsuario}','${Apellidos}','${Nombres}','${hash}','${Telefono}','${DNI}','${Correo}','${FechaNac}','${Usuario}','${IdSucursal}','${Observaciones}')`, function(err: any, result: any, fields: any){        
            
                console.log("result ",result)
                console.log("err ",err)

                if(err || result[0][0].Mensaje != 'Ok'){
                    return res.json({
                        ok: false,
                        Mensaje: 'Ocurrio un error, contactese con el administrador'
                    });
                }

                var pIdPersona = result[0][0].IdPersona;

                // =========== Cargo los permisos para el usuario ===================
                arrayPermisos.forEach(function (pIdPermiso: any) {

                    pool.query(`call bsp_alta_permisos_usuario('${IdUsuario}','${pIdPersona}','${pIdPermiso}')`, function(err: any, result: any, fields: any){
                        
                        console.log("result 2",result)
                        console.log("err 2",err)

                        if(err){
                            res.status(404).json({ text: err });
                            return;
                        }
                        
                    })

                }); 
                // =============Fin permisos=================
                return res.json({ Mensaje: 'Ok' });
            })

        });
    });

}

// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async dameUsuario(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.pIdPersona;

    pool.query(`call bsp_dame_usuario('${pIdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async bajaUsuario(req: Request, res: Response): Promise<void> {
    
    var pIdPersona = req.params.IdPersona; // persona que realiza la transaccion
    var pIdUsuario = req.params.pIdUsuario; // usuario que sera dado de baja

    pool.query(`call bsp_baja_usuario('${pIdPersona}','${pIdUsuario}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//     
// ==================================================
public async cargarDatosFormEditarUsuario(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.IdPersona;
    var pIdUsuario = req.params.IdUsuario;

    pool.query(`call bsp_dame_datos_form_editar_usuario('${pIdPersona}','${pIdUsuario}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}



// ==================================================
//       
// ==================================================
public async editarUsuario(req: Request, res: Response) {

    var respuestaFinal = 'Ok';

    var IdPersona = req.params.IdPersona;
    var IdUsuario = req.params.IdUsuario;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Usuario = req.body[2];
    var Correo = req.body[3];
    var Telefono = req.body[4];
    var DNI = req.body[5];
    var Password = req.body[6];
    var Observaciones = req.body[7];
    var FechaNac = req.body[8];
    var IdSucursal = req.body[9];
    var arrayPermisos = req.body[10];

    const saltRounds = 10;  //  Data processing speed

    if(Password != null && Password != '' && Password != 'null' && Password != 'undefined' && Password != undefined)
    {
        bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
            bcrypt.hash(Password, salt, async function(err: any, hash: any) {
    
                pool.query(`call bsp_editar_usuario('${IdPersona}','${IdUsuario}','${Apellidos}','${Nombres}','${hash}','${Telefono}','${DNI}','${Correo}',${FechaNac},'${Usuario}','${IdSucursal}','${Observaciones}')`, function(err: any, result: any){        
                                    
                    if(err || result[0][0].Mensaje != 'Ok'){
                        respuestaFinal = 'Ocurrio un error, contactese con el administrador';
                        return;
                    }
    
                    // =========== Cargo los permisos para el usuario ===================
                    arrayPermisos.forEach(function (pIdPermiso: any) {
    
                        pool.query(`call bsp_editar_permisos_usuario('${IdPersona}','${IdUsuario}','${pIdPermiso}')`, function(err2: any, result2: any){

                            if(err2 || result2[0][0].Mensaje != 'Ok'){
                                respuestaFinal = result2[0][0].Mensaje;
                                return;
                            }
                            
                        })
    
                    }); 
                    // =============Fin permisos=================
                    console.log("pasa 4")
                    return res.json({ Mensaje: respuestaFinal });
                })
    
            });
        });
    }
    else
    {
        pool.query(`call bsp_editar_usuario('${IdPersona}','${IdUsuario}','${Apellidos}','${Nombres}',null,'${Telefono}','${DNI}','${Correo}','${FechaNac}','${Usuario}','${IdSucursal}','${Observaciones}')`, function(err: any, result: any){        
   

            if(err || result[0][0].Mensaje != 'Ok'){
                return res.json({
                    ok: false,
                    Mensaje: 'Ocurrio un error, contactese con el administrador'
                });
            }
    
            // =========== Cargo los permisos para el usuario ===================
            arrayPermisos.forEach(function (pIdPermiso: any) {
    
                pool.query(`call bsp_editar_permisos_usuario('${IdPersona}','${IdUsuario}','${pIdPermiso}')`, function(err2: any, result2: any){

                    if(err2 || result2[0][0].Mensaje != 'Ok'){
                        return res.json({
                            ok: false,
                            Mensaje: 'Ocurrio un error, contactese con el administrador'
                        });
                    }
                    
                })
    
            }); 
            // =============Fin permisos=================
            return res.json({ Mensaje: 'Ok' });
        })
    }


    

    return;

   

}

}


const usuariosController = new UsuariosController;
export default usuariosController;