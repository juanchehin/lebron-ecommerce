import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class CategoriasController {

// ==================================================
//    Nueva categoria
// ==================================================
public async altaCategoria(req: Request, res: Response) {

    var pCategoria = req.body[0];
    var pDescripcion = req.body[1];
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_alta_categoria('${pIdUsuario}','${pCategoria}','${pDescripcion}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//        Lista
// ==================================================
public async listarCategoriasSubcategorias(req: Request, res: Response): Promise<void> {


    pool.query(`call bsp_listar_categorias_subcategorias()`, function(err: any, result: any){
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
public async listarSubcategoriasPorIdCategoria(req: Request, res: Response): Promise<void> {
    var pIdCategoria = req.params.pIdCategoria || 0;
    var IdPersona = req.params.IdPersona || 0;

    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_listar_subcategorias_idcat " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_listar_subcategorias_idcat(?,?)',[IdPersona,pIdCategoria], function(err: any, result: any){
                
                if (result && result[0] && result[0][0] && result[0][0].Level !== undefined) {

                    if(result[0][0].Level == 'Error'){
                        logger.error("Error en bsp_listar_subcategorias_idcat - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
            
                        res.status(400).json(result);
                        return;
                    }
                }
                
                if(err){
                    logger.error("Error en bsp_listar_subcategorias_idcat - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_listar_subcategorias_idcat 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}

// ==================================================
//        Autocomplete productos
// ==================================================
public async buscarCategoriasPaginado(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    var pIdUsuario = req.params.IdPersona;
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_categoria_paginado('${pIdUsuario}','${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
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
public async bajaCategoria(req: Request, res: Response): Promise<void> {

    var pIdCategoria = req.params.pIdCategoria;
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_baja_categoria('${pIdUsuario}','${pIdCategoria}')`, function(err: any, result: any){
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
public async listarCategorias(req: Request, res: Response): Promise<void> {

    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_listar_todas_categorias('${pIdUsuario}')`, function(err: any, result: any){
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
public async cargarDatosFormEditarCategoria(req: Request, res: Response): Promise<void> {

    var pIdCategoria = req.params.pIdCategoria;
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_dame_datos_form_editar_categoria('${pIdUsuario}','${pIdCategoria}')`, function(err: any, result: any){
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
public editarCategoria(req: Request, res: Response) {

    const { IdPersona } = req.params;
    const { IdCategoria } = req.params;

    var Categoria = req.body[0];
    var Descripcion = req.body[1];

    pool.query(`call bsp_editar_categoria('${IdPersona}','${IdCategoria}','${Categoria}','${Descripcion}')`,function(err: any, result: any){
        
                if(err){
                    res.status(404).json(err);
                    return;
                }
                
                if(result[0][0].mensaje != 'Ok'){
                    return res.json( result );
                }

                return res.json({ Mensaje: 'Ok' });
            })          
    
}


// ==================================================
// ==================================================
//    *** subcategorias ***
// ==================================================
// ==================================================

// ==================================================
//    Nueva categoria
// ==================================================
public async altaSubCategoria(req: Request, res: Response) {

    var pIdCategoria = req.body[0];
    var pSubCategoria = req.body[1];
    var pDescripcion = req.body[2];
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_alta_subcategoria('${pIdUsuario}','${pIdCategoria}','${pSubCategoria}','${pDescripcion}')`, function(err: any, result: any){
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
public async buscarSubCategoriasPaginado(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    var pIdUsuario = req.params.IdPersona;
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_subcategoria_paginado('${pIdUsuario}','${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
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
public async bajaSubCategoria(req: Request, res: Response): Promise<void> {

    var pIdCategoria = req.params.pIdCategoria;
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_baja_subcategoria('${pIdUsuario}','${pIdCategoria}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }
        // res.json(result);

        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async cargarDatosFormEditarSubCategoria(req: Request, res: Response): Promise<void> {

    var pIdSubCategoria = req.params.pIdSubCategoria;
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_dame_datos_form_editar_subcategoria('${pIdUsuario}','${pIdSubCategoria}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }
        // res.json(result);

        res.status(200).json(result);
    })
}

// ==================================================
//      
// ==================================================
public editarSubCategoria(req: Request, res: Response) {

    const { IdPersona } = req.params;
    const { IdSubCategoria } = req.params;

    var IdCategoria = req.body[0];
    var SubCategoria = req.body[1];
    var Descripcion = req.body[2];

    pool.query(`call bsp_editar_subcategoria('${IdPersona}','${IdSubCategoria}','${IdCategoria}','${SubCategoria}','${Descripcion}')`,function(err: any, result: any){
        
                if(err){
                    res.status(404).json(err);
                    return;
                }
                
                if(result[0][0].Mensaje !== 'Ok'){
                    return res.json( result );
                }

                return res.json({ Mensaje: 'Ok' });
            })          
    
}

}


const categoriasController = new CategoriasController;
export default categoriasController;