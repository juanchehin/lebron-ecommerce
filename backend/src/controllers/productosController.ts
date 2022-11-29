import { Request, Response } from 'express';
import pool from '../database';

class ProductosController {

// ==================================================
//        Inserta 
// ==================================================
public async altaProducto(req: Request, res: Response) {

    var IdCategoria = req.body[0];
    var IdMarca = req.body[1];
    var IdSubCategoria = req.body[2];
    var IdUnidad = req.body[3];
    var Producto = req.body[4];
    var Codigo = req.body[5];
    var Stock = req.body[6];
    var FechaVencimiento = req.body[7];
    var Descripcion = req.body[8];
    var StockAlerta = req.body[9];
    var Peso = req.body[10];
    var Sabor = req.body[11];
    var PrecioCompra = req.body[12];
    var PrecioVenta = req.body[13];
    var PrecioMayorista = req.body[14];
    var PrecioMeli = req.body[15];
    var Descuento = req.body[16];    // 19
    var Moneda = req.body[17];

    if(IdSubCategoria == undefined || IdSubCategoria == 'undefined')
    { 
        IdSubCategoria = 1; // sin subcategoria
    }

    if(FechaVencimiento == null || FechaVencimiento == 'null')
    { 
        FechaVencimiento = null;
    }

    pool.query(`call bsp_alta_producto('${IdCategoria}','${IdSubCategoria}','${IdMarca}','${IdUnidad}','${Producto}','${Codigo}','${Stock}',${FechaVencimiento},''${Descripcion}'',${StockAlerta},'${Peso}','${Sabor}',${PrecioCompra},'${PrecioVenta}','${PrecioMayorista}','${PrecioMeli}',${Descuento},'${Moneda}')`, function(err: any, result: any, fields: any){
        
        if(err){
            res.status(404).json({ text: err });
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
//        Lista productos
// ==================================================
public async listarProductosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_productos_paginado('${desde}')`, function(err: any, result: any, fields: any){
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
//        Lista personas desde cierto valor
// ==================================================
public async listarProductosPromocion(req: Request, res: Response): Promise<void> {
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_productos_promocion('${desde}')`, function(err: any, result: any, fields: any){
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
public async listarProductosPromocionHome(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_productos_promocion_home()`, function(err: any, result: any, fields: any){
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
}


const productosController = new ProductosController;
export default productosController;