import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ProductosController {   

    
// ==================================================
//        Inserta 
// ==================================================
public async altaProducto(req: Request, res: Response) {

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

    if(IdSubCategoria == undefined || IdSubCategoria == 'undefined' || IdSubCategoria == null || IdSubCategoria == 'null')
    { 
        IdSubCategoria = 1; // sin subcategoria
    }

    if(FechaVencimiento == null || FechaVencimiento == 'null')
    { 
        FechaVencimiento = null;
    }

    pool.query(`call bsp_alta_producto('${req.params.IdPersona}','${IdCategoria}','${IdSubCategoria}','${IdMarca}','${IdUnidad}','${IdProveedor}','${Producto}',${FechaVencimiento},'${Descripcion}',${StockAlerta},'${Medida}',${PrecioCompra},'${PrecioVenta}','${PrecioMayorista}','${PrecioMeli}',${Descuento},'${Moneda}')`, async function(err: any, result: any, fields: any){
        
        if(err || result[0][0].mensaje != 'Ok'){
            logger.error("Error en bsp_alta_producto - productosController " + err);

            res.status(404).json({ text: err });
            return;
        }

        // ==============================
       if(result[0][0].mensaje == 'Ok')
       {

            arraySaboresCodigo.forEach(function (value: any) {

                var respuesta = pool.query(`call bsp_alta_sabores_codigo_producto('${result[1][0].pIdProducto}','${value.id_sabor}','${value.codigo}')`, function(err2: any, result2: any){
                    
                    if(err2 || result2[0][0].mensaje != 'Ok'){
                        logger.error("Error en bsp_alta_sabores_codigo_producto - productosController " + err);

                        return false;
                    }

                    if(result2[0][0].Level == 'Error'){
                        logger.error("Error en bsp_alta_sabores_codigo_producto - productosController " + result2[0][0].Level);

                        return false;
                    }
                    
                })

                if(!respuesta){
                    logger.error("Error en bsp_alta_sabores_codigo_producto - productosController 2 ");

                    return res.json({
                        ok: false,
                        mensaje: 'Ocurrio un error'
                    });
                }
            });
        }
        // ==============================      

        return res.json({ mensaje: 'Ok' });
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
//   Listado de productos en panel
// ==================================================
public async buscarProductoPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    const IdSucursal = req.params.IdSucursal;
    
    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }
    
    pool.query(`call bsp_buscar_producto_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}','${IdSucursal}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en bsp_buscar_producto_paginado - productosController - " + err + " - " + result );

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//        buscarProductoPaginado
// ==================================================
public async buscarProductoPaginadoFront(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_producto_paginado_front('${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        listar_movimientos_producto_paginado
// ==================================================
listar_movimientos_producto_paginado(req: Request, res: Response){

    var pIdUsuario = req.params.IdPersona;
    
    var p_fecha_inicio = req.params.p_fecha_inicio;
    var p_fecha_fin = req.params.p_fecha_fin;
    var p_id_sucursal_seleccionada = req.params.p_id_sucursal_seleccionada;
    var p_id_operacion_seleccionada = req.params.p_id_operacion_seleccionada;
    var p_id_producto_sabor = req.params.p_id_producto_sabor;
    var p_desde = req.params.p_desde;

    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion buscarProductoAutoComplete " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call listar_movimientos_producto_paginado(?,?,?,?,?,?,?)',[pIdUsuario,p_fecha_inicio,p_fecha_fin,p_id_producto_sabor,
                p_id_sucursal_seleccionada,p_id_operacion_seleccionada,p_desde], function(err: any, result: any){
                    console.log('result::: ', result);
                    console.log('err::: ', err);
                
                if(err){
                    logger.error("Error en listar_movimientos_producto_paginado - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en listar_movimientos_producto_paginado 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

    // **

}

// ==================================================
//        Autocomplete productos
// ==================================================
public async buscarProductoAutoComplete(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pProductoBuscado || '';
    var pIdSucursal = req.params.IdSucursal;
    var pIdUsuario = req.params.IdPersona;
    
    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion buscarProductoAutoComplete " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_buscar_producto_autocomplete(?,?,?)',[pParametroBusqueda,pIdSucursal,pIdUsuario], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_buscar_producto_autocomplete - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_producto_autocomplete 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

    // **

}

// ==================================================
//        
// ==================================================
public async bajaPromocion(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var pIdPromocion = req.params.pIdPromocion;

    pool.query(`call bsp_baja_promocion('${IdPersona}','${pIdPromocion}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
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
//        
// ==================================================
public async publicarProducto(req: Request, res: Response): Promise<void> {

    var pIdProducto = req.params.IdProducto;

    pool.query(`call bsp_publicar_producto('${pIdProducto}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async ofertarProducto(req: Request, res: Response): Promise<void> {

    var pIdProducto = req.params.IdProducto;

    pool.query(`call bsp_ofertar_producto('${pIdProducto}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}
// ==================================================
//      
// ==================================================
public async destacarProducto(req: Request, res: Response): Promise<void> {

    var pIdProducto = req.params.IdProducto;

    pool.query(`call bsp_destacar_producto('${pIdProducto}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
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
//  Obtiene loss detalles del producto para el e-commerce
// ==================================================
public async dameDatosProducto(req: Request, res: Response): Promise<void> {

    const { pIdSabor } = req.params;
    const { pIdProducto } = req.params;

    pool.query(`call bsp_dame_producto_front('${pIdProducto}','${pIdSabor}')`, function(err: any, result: any){
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

    const { IdProducto } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_producto('${IdPersona}','${IdProducto}')`, function(err: any, result: any){
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
public async dameStockSaborProducto(req: Request, res: Response): Promise<void> {

    const { pIdProducto } = req.params;
    const { pIdSabor } = req.params;

    pool.query(`call bsp_stock_sabor_producto('${pIdProducto}','${pIdSabor}')`, function(err: any, result: any){
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


// ==================================================
//         
// ==================================================
public async editar_producto(req: Request, res: Response) {

    var IdUsuario = req.params.IdPersona;

    var IdProducto = req.body[0];
    var IdCategoria = req.body[1];
    var IdSubCategoria = req.body[2];
    var IdMarca = req.body[3];
    var IdUnidad = req.body[4];    
    var Producto = req.body[5];
    var IdProveedor = req.body[6];
    var FechaVencimiento = req.body[7];
    var Descripcion = req.body[8];
    var StockAlerta = req.body[9];
    var Medida = req.body[10];
    var PrecioCompra = req.body[11];
    var PrecioVenta = req.body[12];
    var PrecioMayorista = req.body[13];
    var PrecioMeli = req.body[14];
    var Descuento = req.body[15];
    var Moneda = req.body[16].charAt(0);
    var arraySaboresCodigo = req.body[17];
    var cantidad_sabores_cargados = req.body[18];

    if(IdSubCategoria == undefined || IdSubCategoria == 'undefined' || IdSubCategoria == null || IdSubCategoria == 'null')
    { 
        IdSubCategoria = 1; // sin subcategoria
    }

    if(FechaVencimiento == null || FechaVencimiento == 'null')
    { 
        FechaVencimiento = null;
    }

    if(Descripcion == undefined || Descripcion == 'undefined' || Descripcion == null || Descripcion == 'null')
    { 
        Descripcion = '-';
    }

    const json_arraySaboresCodigo = JSON.stringify(arraySaboresCodigo);


    // **
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_editar_producto " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_editar_producto(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[IdUsuario,IdProducto,IdCategoria,IdSubCategoria,IdMarca,IdUnidad,Producto,IdProveedor,FechaVencimiento,Descripcion
            ,StockAlerta,Medida,PrecioCompra,PrecioVenta,PrecioMayorista,PrecioMeli,Descuento,Moneda,json_arraySaboresCodigo,cantidad_sabores_cargados], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_editar_producto - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_editar_producto 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

    // **

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
//    Nueva unidad
// ==================================================
public async altaUnidad(req: Request, res: Response, callback: any) {

    var pUnidad = req.body[0];
    var pNombreCorto = req.body[1];

    pool.query(`call bsp_alta_unidad('${pUnidad}','${pNombreCorto}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
   
}

// ==================================================
//        Edita una 
// ==================================================
public async editarUnidad(req: Request, res: Response) {

    var pIdUnidad = req.body[0];
    var pUnidad = req.body[1];
    var pNombreCorto = req.body[2];

    var pNombreCorto =  pNombreCorto.replace(/'/g, "");

    pool.query(`call bsp_editar_unidad('${pIdUnidad}','${pUnidad}','${pNombreCorto}')`, function(err: any, result: any){
        
        if(err || result.mensaje !== 'Ok'){
            logger.error("Error en editarUnidad - bsp_editar_unidad - productosController");

            return res.json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }

        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//   Cargo 
// ==================================================
public async cargarDatosFormEditarUnidad(req: Request, res: Response): Promise<void> {

    const { IdPersona } = req.params;
    const { IdUnidad } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_unidad('${IdPersona}','${IdUnidad}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en bsp_dame_datos_form_editar_unidad - ProductosController ");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//      
// ==================================================
public async bajaUnidad(req: Request, res: Response): Promise<void> {

    var IdUnidad = req.params.IdUnidad;

    pool.query(`call bsp_baja_unidad('${IdUnidad}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            logger.error("Error en bsp_baja_unidad - ProductosController ");

            return res.status(200).json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
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

// ==================================================
//  Obtiene loss detalles de la promocion para el e-commerce
// ==================================================
public async dameDatosPromocion(req: Request, res: Response): Promise<void> {

    const { pIdPromocion } = req.params;
    const { pIdSabor1 } = req.params;
    const { pIdSabor2 } = req.params;

    pool.query(`call bsp_dame_promocion_front('${pIdPromocion}','${pIdSabor1}','${pIdSabor2}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==============================
public async altaPromocion(req: Request, res: Response) {

    var pIdProdUno = req.body[0]; 
    var pIdProdDos = req.body[1];
    var pPromocion = req.body[2];
    var pDescripcion = req.body[3];

    if(pDescripcion == undefined || pDescripcion == 'undefined')
    { 
        pDescripcion = '';
    }

    pool.query(`call bsp_alta_promocion('${req.params.IdPersona}','${pIdProdUno}','${pIdProdDos}','${pPromocion}','${pDescripcion}')`, function(err: any, result: any, fields: any){
        
        if(err){
            logger.error("Error en bsp_alta_promocion - productosController");

            res.status(404).json({ text: err });
            return;
        }

        if(result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }else{
            logger.error("Error en altaPromocion - productosController");
        }

        res.status(200).json(result);

    })

}

// ==================================================
//        
// ==================================================
public async publicarPromocion(req: Request, res: Response): Promise<void> {

    var pIdPromocion = req.params.IdPromocion;

    pool.query(`call bsp_publicar_promocion('${pIdPromocion}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}
// ==================================================
//        
// ==================================================
public async listarPromocionesPaginadoFront(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_promociones_paginado_front('${desde}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//       ***** Tranferencias *****
// ==================================================
// ==============================
public async listarTransferenciasPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var pFecha = req.params.pFecha;
    var pIdUsuario = req.params.IdPersona;

    pool.query(`call bsp_listar_transferencias_paginado('${pIdUsuario}','${desde}','${pFecha}')`, function(err: any, result: any){

        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==============================
public async detalle_transferencia(req: Request, res: Response): Promise<void> {

    var id_transaccion = req.params.id_transaccion;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_detalle_transferencia " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_detalle_transferencia(?)',[id_transaccion], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_detalle_transferencia - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }

                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_detalle_transferencia - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_detalle_transferencia 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}
// ==================================================
//    Nueva transferencia de stock
// ==================================================
public async altaTransferencia(req: Request, res: Response) {

    var fechaTransferencia = req.body[0];
    var pIdSucursalOrigen = req.body[1];
    var pIdSucursalDestino = req.body[2];
    var totalTransferencia = req.body[3];
    var pLineaTransferencias = req.body[4];
    var pCantidadLineaTransferencias = req.body[5];
    var observaciones_alta_transferencia = req.body[6];

    var pIdUsuario = req.params.IdPersona;

    const jsonpLineaTransferencias = JSON.stringify(pLineaTransferencias);
    
    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_alta_transferencia " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_alta_transferencia(?,?,?,?,?,?,?,?)',[pIdUsuario,fechaTransferencia,pIdSucursalOrigen,
                pIdSucursalDestino,totalTransferencia,jsonpLineaTransferencias,pCantidadLineaTransferencias,observaciones_alta_transferencia], function(err: any, result: any){

                if(err){
                    logger.error("Error en bsp_alta_transferencia - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
                
                if(result[0][0].Level == 'Error'){
                    logger.error("Error en bsp_alta_transferencia - result Code: " + result[0][0].Code + " - Message: " + result[0][0].Message);
        
                    res.status(400).json(result);
                    return;
                }
                
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_alta_transferencia 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });
    // =================================================================

   
}


// ==================================================
//        buscarProductoAutoCompleteTransferencia
// ==================================================
public async buscarProductoAutoCompleteTransferencia(req: Request, res: Response): Promise<void> {

    var pProductoBuscado = req.params.pProductoBuscado || '';
    var pIdSucursalOrigen = req.params.pIdSucursalOrigen || '';
    var pIdUsuario = req.params.IdPersona;
    
    if(pProductoBuscado == null || pProductoBuscado == 'null')
    {
        pProductoBuscado = '';
    }

      // **
      pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion buscarProductoAutoComplete " + err);
            throw err; // not connected!
        }

        try {
            // Use the connection
            connection.query('call bsp_buscar_producto_autocomplete(?,?,?)',[pProductoBuscado,pIdSucursalOrigen,pIdUsuario], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_buscar_producto_autocomplete buscarProductoAutoCompleteTransferencia - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_producto_autocomplete buscarProductoAutoCompleteTransferencia 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });


    // pool.query(`call bsp_buscar_producto_autocomplete_sucursal('${pParametroBusqueda}','${pIdSucursalOrigen}')`, function(err: any, result: any){

    //     if(err){
    //         res.status(400).json(err);
    //         return;
    //     }

    //     res.status(200).json(result);
    // })
}


}


const productosController = new ProductosController;
export default productosController;