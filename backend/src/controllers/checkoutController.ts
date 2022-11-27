import { Request, Response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

class CheckoutController {
// ==================================================
//        
// ==================================================
public async datosComprarAhora(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.pIdPersona;
    var pIdProducto = req.params.pIdProducto;

    pool.query(`call bsp_datos_comprar_ahora('${pIdPersona}','${pIdProducto}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}


// ==================================================
//        Inserta un usuario
// ==================================================
public async altaUsuario(req: Request, res: Response) {

    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var DNI = req.body.DNI;
    var Pass = req.body.Pass;
    var Telefono = req.body.Telefono;
    var Observaciones = req.body.Observaciones;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;    
    var Direccion = req.body.Direccion;
    var FechaNac = req.body.FechaNac;

    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(Pass, salt, async function(err: any, hash: any) {

            pool.query(`call bsp_alta_usuario('${Apellidos}','${Nombres}','${hash}','${Telefono}','${DNI}','${Correo}','${Direccion}','${FechaNac}','${Usuario}'},'${Observaciones}')`, function(err: any, result: any, fields: any){        if(err){
                    console.log("error : ", err);
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

}


const checkoutController = new CheckoutController;
export default checkoutController;