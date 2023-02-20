import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class QuimicosController {   

    
// ==================================================
//        Inserta 
// ==================================================
public async altaQuimico(req: Request, res: Response) {

    var IdUnidad = req.body[0];    
    var Quimico = req.body[1];
    var FechaVencimiento = req.body[2];
    var Descripcion = req.body[3];
    var StockAlerta = req.body[4];
    var Medida = req.body[5];
    var PrecioCompra = req.body[6];
    var PrecioVenta = req.body[7];
    var PrecioMayorista = req.body[8];
    var PrecioMeli = req.body[9];
    var Descuento = req.body[10];
    var Moneda = req.body[11].charAt(0);
    var arraySaboresCodigo = req.body[12];

    console.log("req.body es ",req.body)

    if(FechaVencimiento == null || FechaVencimiento == 'null')
    { 
        FechaVencimiento = null;
    }

    pool.query(`call bsp_alta_quimico('${req.params.IdPersona}','${IdUnidad}','${Quimico}',${FechaVencimiento},'${Descripcion}',${StockAlerta},'${Medida}',${PrecioCompra},'${PrecioVenta}','${PrecioMayorista}','${PrecioMeli}',${Descuento},'${Moneda}')`, async function(err: any, result: any, fields: any){
        
        if(err || result[0][0].Mensaje != 'Ok'){
            logger.error("Error en bsp_alta_quimico - quimicoController " + err);

            res.status(404).json({ text: err });
            return;
        }

        // ==============================
       if(result[0][0].Mensaje == 'Ok')
       {

            arraySaboresCodigo.forEach(function (value: any) {
                

                var respuesta = pool.query(`call bsp_alta_sabores_codigo_quimico('${result[1][0].pIdQuimico}','${value.IdSabor}','${value.Codigo}')`, function(err2: any, result2: any){
                    
                    if(err2 || result2[0][0].Mensaje != 'Ok'){
                        logger.error("Error en bsp_alta_sabores_codigo_quimico - quimicoController " + err);

                        return false;
                    }

                    if(result2[0][0].Level == 'Error'){
                        logger.error("Error en bsp_alta_sabores_codigo_quimico - quimicoController " + result2[0][0].Level);

                        return false;
                    }
                    
                })

                if(!respuesta){
                    logger.error("Error en bsp_alta_sabores_codigo_quimico - quimicoController 2 ");

                    return res.json({
                        ok: false,
                        Mensaje: 'Ocurrio un error'
                    });
                }
            });
        }
        // ==============================      

        return res.json({ Mensaje: 'Ok' });
    })

}

// ==================================================
//        Lista quimicos
// ==================================================
public async listarQuimicosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_quimicos_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista quimicos
// ==================================================
public async bajaQuimico(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdQuimico = req.params.pIdQuimico;

    pool.query(`call bsp_baja_quimico('${IdPersona}','${IdQuimico}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de quimicos en panel
// ==================================================
public async buscarQuimicoPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    const IdSucursal = req.params.IdSucursal;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_quimico_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}','${IdSucursal}')`, function(err: any, result: any){
        
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//        Autocomplete quimicos
// ==================================================
public async buscarQuimicoAutoComplete(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    var pIdSucursal = req.params.IdSucursal;
    var pIdUsuario = req.params.IdPersona;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_quimico_autocomplete('${pParametroBusqueda}','${pIdSucursal}','${pIdUsuario}')`, function(err: any, result: any){
        logger.error("Error en bsp_buscar_quimico_autocomplete - quimicoController");

        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormEditarQuimico(req: Request, res: Response): Promise<void> {

    const { IdQuimico } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_quimico('${IdPersona}','${IdQuimico}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//  
// ==================================================
public async dameStockSaborQuimico(req: Request, res: Response): Promise<void> {

    const { pIdQuimico } = req.params;
    const { pIdSabor } = req.params;

    pool.query(`call bsp_stock_sabor_quimico('${pIdQuimico}','${pIdSabor}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormNuevoQuimico(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_dame_datos_form_nuevo_quimico()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

}


const quimicoController = new QuimicosController;
export default quimicoController;