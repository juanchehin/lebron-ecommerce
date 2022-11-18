import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

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
//        Lista personas desde cierto valor
// ==================================================
    public async list(req: Request, res: Response): Promise<void> {
        var desde = req.query.desde || 0;
        desde  = Number(desde);

        pool.query(`call bsp_listar_personas('${desde}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            res.json(result);
        })
    }

// ==================================================
//        Obtiene una personas de la BD
// ==================================================
public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    let datos: any;

    pool.query(`call bsp_dame_persona('${id}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "La personas no existe" });
        }
        
        datos = result[0]
    })

    // const pathImg = path.join( __dirname, `../uploads/clientes/${ id }.png` );
    // console.log("pasa pathImg ",pathImg)

    // if ( fs.existsSync( pathImg ) ) {
    //     console.log("pasa if ")
    //     return res.sendFile((pathImg), datos);
    // } else {
    //     console.log("pasa else ")
    //     return res.json(datos);
    // }

}


// ==================================================
//        Busqueda por nombre - apellido
// ==================================================
public async buscar(req: Request, res: Response): Promise<any> {
    const busqueda = req.params.busqueda;
    
    pool.query(`call bsp_buscar_persona('${busqueda}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "La personas no existe" });
        }
        
        return res.json(result);
    })
}

// ==================================================
//        Actualiza una persona
// ==================================================

public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('bsp_modifica_persona(?,?)', [req.body, id]);
    res.json({ message: "La persona se actualizo" });
}

// ==================================================
//        Da de baja una persona
// ==================================================
public async baja(req: Request, res: Response): Promise<void> {
    const id = req.query.termino;
    const result = await pool.query('CALL bsp_darbaja_persona(?)', [id]);
    res.json({ message: "Persona dada de baja" });
}

    
// ===========================================================================
// =========================== CLIENTES ==========================================
// ===========================================================================


// ==================================================
//        Inserta un cliente
// ==================================================
public async altaCliente(req: Request, res: Response) {

    console.log("pasa bsp_alta_cliente req.body : ",req.body)

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

 // ==================================================
//   Lista los clientes inscriptos en un cierto plan
// ==================================================

public async listarClientesPlan(req: Request, res: Response): Promise<void> {

     var IdPlan = req.params.IdPlan || 0;
     IdPlan  = Number(IdPlan);

     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_clientes_plan('${desde}','${IdPlan}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
 }

// ===========================================================================
// =========================== PROFESIONALES ==========================================
// ===========================================================================


// ==================================================
//        Inserta un profesional
// ==================================================


public async createProfesional(req: Request, res: Response) {

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
    var Numero = req.body.Numero;    // 19
    var IdRol = req.body.IdRol; 

    pool.query(`call bsp_alta_profesional('${IdTipoDocumento}','${IdRol}','${Apellidos}','${Nombres}'
    ,'${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}','${Correo}','${Usuario}'
    ,'${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero})`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }
    
        res.json({ Mensaje: 'Ok' });
        
    })   

}

// ==================================================
//        Actualiza un profesional
// ==================================================
public async actualizaProfesional(req: Request, res: Response) {

    var IdPersona = req.body.IdPersona;
    var IdTipoDocumento = req.body.IdTipoDocumento;
    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var Documento = req.body.Documento;
    // var Password = bcrypt.hashSync(req.body.Password,10);         // Encriptacion de una sola via
    var Password = req.body.Password;
    var Telefono = req.body.Telefono;
    var Sexo = req.body.Sexo;
    var Observaciones = req.body.Observaciones;
    var IdRol = req.body.IdRol;
    var FechaNac = req.body.FechaNac;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;
    var Calle = req.body.Calle;
    var Piso = req.body.Piso;
    var Departamento = req.body.Departamento;
    var Ciudad = req.body.Ciudad;
    var Pais = req.body.Pais;
    var Numero = req.body.Numero;    // 20
    var Estado = req.body.Estado; 

    pool.query(`call bsp_actualiza_profesional('${IdPersona}','${IdTipoDocumento}','${IdRol}','${Apellidos}','${Nombres}'
    ,'${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}',${FechaNac},'${Correo}','${Usuario}'
    ,'${Calle}','${Piso}','${Departamento}','${Ciudad}','${Pais}','${Numero}','${Estado}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }
    
        res.json({ Mensaje: 'Ok' });
        
    })

}

// ==================================================
//   Da de baja un profesional
// ==================================================
public async darBajaProfesional(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_darbaja_profesional('${IdPersona}')`, function(err: any, result: any, fields: any){
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
//        Lista el personal del gimnasio desde cierto valor
// ==================================================
public async listarPersonal(req: Request, res: Response): Promise<void> {
    var desde =  req.params.desde;
    var incluyeBajas =  req.params.incluyeBajas;

    pool.query(`call bsp_listar_personal('${desde}','${incluyeBajas}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
 }

 // ==================================================
//        Lista el personal del gimnasio desde cierto valor
//       Si en pDesde viene '-1' entonces se listan todos los profesionales
// ==================================================

public async listarProfesionales(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_profesionales()`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        
        return res.json(result);
        
    })
 }
}


const clientesController = new ClientesController;
export default clientesController;