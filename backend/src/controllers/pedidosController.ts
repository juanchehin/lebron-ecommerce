import { Request, Response } from 'express';
import pool from '../database';

class ProductosController {

// ==================================================
//        Lista productos
// ==================================================
public async listarPedidosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var fecha = req.params.pFecha

    pool.query(`call bsp_listar_pedidos_paginado('${desde}','${fecha}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        buscarProductoPaginado
// ==================================================
public async buscarProducto(req: Request, res: Response): Promise<void> {

    const productoBuscado = req.params.productoBuscado;

    pool.query(`call bsp_buscar_producto('${productoBuscado}')`, function(err: any, result: any){
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
public async listarPromociones(req: Request, res: Response): Promise<void> {
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_promociones('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista los productos destacados para mostrar en el home
// ==================================================
public async listarProductosDestacadosHome(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_productos_destacados_home()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista los productos destacados para mostrar en el home
// ==================================================
public async listarPromocionesHome(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_promociones_home()`, function(err: any, result: any, fields: any){
        if(err){
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        Lista
// ==================================================
public async listarProductosCategoria(req: Request, res: Response): Promise<void> {

    const IdCategoria = req.params.IdCategoria;
    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_dame_productos_categoria_id('${IdCategoria}','${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}


// ==================================================
//        buscarProductoPaginado
// ==================================================
public async buscarProductoPaginado(req: Request, res: Response): Promise<void> {

    const productoBuscado = req.params.pProductoBuscado;
    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_buscar_producto_paginado('${productoBuscado}','${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//        get one
// ==================================================
public async dameDatosProducto(req: Request, res: Response): Promise<void> {

    const { pIdProducto } = req.params;

    pool.query(`call bsp_dame_producto_front('${pIdProducto}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        get one
// ==================================================
public async listarProductosRelacionados(req: Request, res: Response): Promise<void> {

    const { pIdProducto } = req.params;

    pool.query(`call bsp_dame_productos_relacionados('${pIdProducto}')`, function(err: any, result: any){
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
public async cargarDatosFormNuevoProducto(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_dame_datos_form_nuevo_producto()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==============================
// ==================================================
//       ***** UNIDADES *****
// ==================================================
// ==============================
public async listarUnidadesPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_unidades_paginado('${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

public async listarTodasUnidades(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_todas_unidades()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//       ***** Promociones *****
// ==================================================
// ==============================
public async listarPromocionesPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_promociones_paginado('${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==============================
public async altaPromocion(req: Request, res: Response) {

    var pProductosPromocion = req.body[0]; 
    var pPromocion = req.body[1];
    var pPrecio = req.body[2];
    var pDescripcion = req.body[3];

    if(pDescripcion == undefined || pDescripcion == 'undefined')
    { 
        pDescripcion = '';
    }

    pool.query(`call bsp_alta_promocion('${pPromocion}','${pPrecio}','${pDescripcion}')`, function(err: any, result: any, fields: any){
        
        if(err){
            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        var pIdPromocion = result[0][0].pIdPromocion;

        // *** Recorro los productos cargados a la promo ***
        pProductosPromocion.forEach(function (value: any) {

            var pIdProducto = value.IdProducto;
            var pCantidad = value.Cantidad;

            pool.query(`call bsp_alta_item_promocion('${pIdPromocion}','${pIdProducto}','${pCantidad}')`, function(err: any, result: any, fields: any){
        
                if(err){
                    res.status(404).json({ text: err });
                    return;
                }
        
                if(result[0][0].Mensaje !== 'Ok'){
                    return res.status(404).json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
            })

        });

        res.status(200).json(result);

        // *** Fin Recorro los productos cargados a la promo ***
    })

}

}


const productosController = new ProductosController;
export default productosController;