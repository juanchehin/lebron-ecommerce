import { Request, Response } from 'express';
import pool from '../database';

class ProductosController {


    

// ==================================================
//        Inserta 
// ==================================================
public async altaProducto(req: Request, res: Response) {

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    var IdCategoria = req.body[0];
    var IdSubCategoria = req.body[1];
    var IdMarca = req.body[2];
    var IdUnidad = req.body[3];    
    var Producto = req.body[4];
    var IdProveedor = req.body[5];
    var FechaVencimiento = req.body[6];
    var Descripcion = req.body[7];
    var StockAlerta = req.body[8];
    var Medida = req.body[9];
    var PrecioCompra = req.body[10];
    var PrecioVenta = req.body[11];
    var PrecioMayorista = req.body[12];
    var PrecioMeli = req.body[13];
    var Descuento = req.body[14];
    var Moneda = req.body[15].charAt(0);
    var arraySaboresCodigo = req.body[16];

    if(IdSubCategoria == undefined || IdSubCategoria == 'undefined')
    { 
        IdSubCategoria = 1; // sin subcategoria
    }

    if(FechaVencimiento == null || FechaVencimiento == 'null')
    { 
        FechaVencimiento = null;
    }

    const { err, result } = pool.query(`call bsp_alta_producto('${req.params.IdPersona}','${IdCategoria}','${IdSubCategoria}','${IdMarca}','${IdUnidad}','${IdProveedor}','${Producto}','${FechaVencimiento}','${Descripcion}',${StockAlerta},'${Medida}',${PrecioCompra},'${PrecioVenta}','${PrecioMayorista}','${PrecioMeli}',${Descuento},'${Moneda}')`, async function(err: any, result: any, fields: any){
        

        console.log("err : ",err)
        console.log("resulta : ",result)

        if(err){
            res.status(404).json({ text: err });
            return;
        }

        // ==============================
       if(result[0][0].Mensaje == 'Ok')
       {

            arraySaboresCodigo.forEach(function (value: any) {
                

                var respuesta = pool.query(`call bsp_alta_sabores_codigo_producto('${result[1][0].pIdProducto}','${value.IdSabor}','${value.Codigo}')`, function(err2: any, result2: any){
                    
                    console.log("err 2: ",err2)
                    console.log("resulta 2: ",result2)


                    if(err2){
                        return false;
                    }

                    if(result2[0][0].Level == 'Error'){
                        return false;
                    }
                    
                })

                console.log("respuesta : ",respuesta)

                if(!respuesta){
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
//        Lista productos
// ==================================================
public async bajaProducto(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdProducto = req.params.pIdProducto;

    pool.query(`call bsp_baja_producto('${IdPersona}','${IdProducto}')`, function(err: any, result: any, fields: any){
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
public async buscarProductoPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    const IdSucursal = req.params.IdSucursal;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_producto_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}','${IdSucursal}')`, function(err: any, result: any){
        
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
public async cargarDatosFormEditarProducto(req: Request, res: Response): Promise<void> {

    const { pIdProducto } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_producto('${IdPersona}','${pIdProducto}')`, function(err: any, result: any){
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