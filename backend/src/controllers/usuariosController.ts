import { Request, Response } from 'express';
import pool from '../database';

class UsuariosController {
// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async listarUsuariosPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_usuarios_paginado('${desde}')`, function(err: any, result: any, fields: any){
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

    pool.query(`call bsp_alta_usuario('${Apellidos}','${Nombres}','${Telefono}','${DNI}','${Correo}','${Direccion}','${FechaNac}','${Usuario}'},'${Observaciones}')`, function(err: any, result: any, fields: any){        if(err){
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

}

}


const usuariosController = new UsuariosController;
export default usuariosController;