import { Request, Response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

class DireccionesController {

// ==================================================
//        Lista 
// ==================================================
public async buscarPorCP(req: Request, res: Response): Promise<void> {
    var cp = req.params.pCP;

    if(cp.toString().length != 4){
        res.status(401).json({
            ok: true,
            mensaje : 'CP invalido'
        });
        return;
    }

    pool.query(`call bsp_dame_provincia_localidad_cp('${cp}')`, function(err: any, result: any){
        if(err){
            res.status(500).json({
                ok: true,
                mensaje : 'Ocurrio un problema, contactese con el administrador'
            });
            return;
        }
        res.status(200).json(result);
    })
}


// ==================================================
//        Inserta 
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


}


const direccionesController = new DireccionesController;
export default direccionesController;