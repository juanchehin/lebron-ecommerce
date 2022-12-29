import { Request, Response } from 'express';
import pool from '../database';

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
        // res.json(result);

        res.status(200).json(result);
    })
}

// ==================================================
//    
// ==================================================
public async listarSubcategoriasPorIdCategoria(req: Request, res: Response): Promise<void> {
    var pIdCategoria = req.params.pIdCategoria || 0;
    
    pool.query(`call bsp_listar_subcategorias_idcat('${pIdCategoria}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }
        // res.json(result);

        res.status(200).json(result);
    })
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
        // res.json(result);

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
        // res.json(result);

        res.status(200).json(result);
    })
}

// ==================================================
//      
// ==================================================
public editarCategoria(req: Request, res: Response) {

    const { IdPersona } = req.params;

    console.log("req. body : ",req.body);

    var Categoria = req.body[0];
    var Descripcion = req.body[1];

    pool.query(`call bsp_editar_categoria('${IdPersona}','${Categoria}','${Descripcion}')`,function(err: any, result: any){
        
                console.log("result ",result)

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