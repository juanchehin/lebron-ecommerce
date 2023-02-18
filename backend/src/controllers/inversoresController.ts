import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class InversoresController {


// ==================================================
//        Lista Clientes desde cierto valor
// ==================================================
public async buscarInversoresPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.IdPersona;
    var inversorBuscado: any = req.params.inversorBuscado;
    
    if(inversorBuscado == '0' || inversorBuscado == 0)
    {
        inversorBuscado = "todosInversores";
    }

    pool.query(`call bsp_buscar_inversores_paginado('${pIdPersona}','${inversorBuscado}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
           res.status(404).json(result);
           return;
       }
       res.status(200).json(result);
    })

 }

// ==================================================
//        Lista 
// ==================================================
public async listarTodosInversores(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_inversores()`, function(err: any, result: any, fields: any){

        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Inserta 
// ==================================================
public async altaInversor(req: Request, res: Response) {

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var DNI = req.body[2];
    var Telefono = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];

    pool.query(`call bsp_alta_inversor('${Apellidos}','${Nombres}','${DNI}','${Telefono}','${Email}','${Observaciones}')`, function(err: any, result: any, fields: any){
        
        if(err){
            logger.error("Error en altaInversor - bsp_alta_inversor - inversoresController");

            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en altaInversor - bsp_alta_inversor - inversoresController");

            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}
// ==================================================
//        da de baja un inversor 
// ==================================================
public async bajaInversor(req: Request, res: Response): Promise<void> {
    
    var IdInversor = req.params.pIdInversor;
    var IdUsuario = req.params.IdPersona;

    pool.query(`call bsp_baja_inversor('${IdUsuario}','${IdInversor}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}


// ==================================================
//        Edita un inversor
// ==================================================
public async editarInversor(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona; // Usuario que realiza la transaccion

    var IdInversor = req.body[0];
    var Inversor = req.body[1];
    var Apellidos = req.body[2];
    var Nombres = req.body[3];
    var Telefono = req.body[4];
    var CUIL = req.body[5];
    var Email = req.body[6];
    var Observaciones = req.body[7];

    pool.query(`call bsp_editar_inversor('${IdUsuario}','${IdInversor}','${Inversor}','${Apellidos}','${Nombres}','${Telefono}','${CUIL}','${Email}','${Observaciones}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en editarInversor - bsp_editar_inversor - inversoresController");

            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            logger.error("Error en editarInversor - bsp_editar_inversor - inversoresController");

            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormEditarInversor(req: Request, res: Response): Promise<void> {

    const { pIdInversor } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_inversor('${IdPersona}','${pIdInversor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

}


const inversoresController = new InversoresController;
export default inversoresController;