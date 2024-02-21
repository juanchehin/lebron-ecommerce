import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const logger = require("../utils/logger").logger;

class ClientesController {


// ==================================================
//        Obtiene un cliente de la BD
// ==================================================
public async dameDatosCliente(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        Inserta un cliente enviando un correo de confirmacion
// ==================================================
public async altaCliente(req: Request, res: Response) {

    const { IdPersona } = req.params;
    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var DNI = req.body[2];
    var Telefono = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];
    
    pool.query(`call bsp_alta_cliente_panel('${IdPersona}','${Apellidos}','${Nombres}','${DNI}','${Telefono}','${Email}','${Observaciones}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })

    // enviarMailBienvenida(Email);   

}
// ==================================================
//      
// ==================================================
public async editarCliente(req: Request, res: Response) {

    const { IdPersona } = req.params;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var DNI = req.body[3];
    var Email = req.body[4];
    var Observaciones = req.body[5];

    var pIdCliente = req.body[6];

    pool.query(`call bsp_editar_cliente('${IdPersona}','${pIdCliente}','${Apellidos}','${Nombres}','${Telefono}','${DNI}','${Email}','${Observaciones}')`,function(err: any, result: any, fields: any){
        
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

// ==================================================
//   Edita el cliente desde la cuenta del cliente por el cliente
// ==================================================
public async editarClienteFront(req: Request, res: Response) {

    const { IdPersona } = req.params;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var DNI = req.body[3];
    var Email = req.body[4];

    pool.query(`call bsp_editar_cliente_front('${IdPersona}','${Apellidos}','${Nombres}','${Telefono}','${DNI}','${Email}')`,function(err: any, result: any){
        
                if(err){
                    logger.error("Error en editarClienteFront - clientesController " + err);

                    res.status(404).json(err);
                    return;
                }
                
                if(result[0][0].Mensaje !== 'Ok'){
                    logger.error("Error en editarClienteFront - clientesController " + result );

                    return res.json( result );
                }

                return res.json({ Mensaje: 'Ok' });
            })          
    
}
// ==================================================
//        Inserta una direccion
// ==================================================
public async altaDireccionCliente(req: Request, res: Response) {

    var IdCliente = req.params.IdPersona;

    var IdLocalidad = req.body[0];
    var Calle = req.body[1];
    var Numero = req.body[2];
    var Piso = req.body[3];
    var Departamento = req.body[4];
    var Referencia = req.body[5];
    var Telefono = req.body[6];
    
    pool.query(`call bsp_alta_direccion_cliente('${IdLocalidad}','${IdCliente}','${Calle}','${Numero}','${Piso}','${Departamento}','${Referencia}','${Telefono}')`, 
    function(err: any, result: any, fields: any){
        
                if(err){
                    logger.error("Error en altaDireccionCliente - clientesController " + result );

                    res.status(404).json(err);
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
//        Inserta
// ==================================================
public async altaProductoCarrito(req: Request, res: Response) {

    var IdProducto = req.body[0];
    var IdCliente = req.body[1];
    var Cantidad = req.body[2];
    var IdSaborSeleccionado = req.body[3]
    
    pool.query(`call bsp_alta_producto_carrito('${IdCliente}','${IdProducto}','${IdSaborSeleccionado}','${Cantidad}')`,function(err: any, result: any, fields: any){
        
                if(err){
                    logger.error("Error en altaProductoCarrito - clientesController " + err );

                    res.status(404).json(err);
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
//        Inserta
// ==================================================
public async altaPromocionCarrito(req: Request, res: Response) {

    var IdPromocion = req.body[0];
    var IdCliente = req.body[1];
    var IdSabor1 = req.body[2];
    var IdSabor2 = req.body[3];
    var Cantidad = req.body[4];
    
    pool.query(`call bsp_alta_promocion_carrito('${IdCliente}','${IdPromocion}','${IdSabor1}','${IdSabor2}','${Cantidad}')`,function(err: any, result: any, fields: any){
        
                if(err){
                    logger.error("Error en altaPromocionCarrito - clientesController " + err );

                    res.status(404).json(err);
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
//   Activa un cliente (caso de ya existencia en la BD)
// ==================================================
public async activarCliente(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    const result: any = await pool.query('CALL bsp_activar_cliente(?)',IdPersona);

    if(result[0][0].Mensaje !== 'Ok'){
        return res.json({
            ok: false,
            mensaje: result[0][0].Mensaje
        });
    }

    return res.json({ Mensaje: 'Ok' });

}


// ==================================================
//        Lista Clientes desde cierto valor
// ==================================================
public async buscarClientesPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.IdPersona;
    var clienteBuscado: any = req.params.clienteBuscado;
    var filtroCliente: any = req.params.filtroCliente;
    
    if(clienteBuscado == '0' || clienteBuscado == 0)
    {
        clienteBuscado = "todosClientes";
    }

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion buscarClientesPaginado " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_buscar_clientes_paginado(?,?,?,?)',[pIdPersona,filtroCliente,clienteBuscado,desde], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_buscar_clientes_paginado - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_clientes_paginado 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

 }

 // ==================================================
//        Lista
// ==================================================

public async listarCarritoCliente(req: Request, res: Response): Promise<void> {
    
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_listar_items_carrito_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
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

public async listarComprasCliente(req: Request, res: Response): Promise<void> {
    
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_listar_compras_online_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
           res.status(404).json(result);
           return;
       }
       res.status(200).json(result);
   })
}
 // ==================================================
//        Lista Clientes desde cierto valor
// ==================================================

public async dameDatosClienteEnvio(req: Request, res: Response): Promise<void> {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_direccion_cliente_costo('${IdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
           return;
       }
       res.json(result);
   })
}


 // ==================================================
//        Lista 
// ==================================================

public async dameDirecionesCliente(req: Request, res: Response): Promise<void> {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_direcciones_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
           return;
       }
       res.json(result);
   })
}

 // ==================================================
//        Lista 
// ==================================================

public async cargarDatosFormEditarCliente(req: Request, res: Response): Promise<void> {
    var pIdCliente = req.params.pIdCliente;
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_datos_cliente('${IdPersona}','${pIdCliente}')`, function(err: any, result: any, fields: any){
       if(err){
           return;
       }
       res.json(result);
   })
}
// ==================================================
//   Elimina un cliente de la BD
// ==================================================

public async eliminarCliente(req: Request, res: Response) {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_eliminar_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                mensaje: result.Mensaje
            });
        }
    
        return res.json({ mensaje: 'Ok' });
    })

}
// ==================================================
//        Obtiene un cliente de la BD
// ==================================================
public async bajaCliente(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;
    const { IdCliente } = req.params;

    pool.query(`call bsp_baja_cliente('${IdPersona}','${IdCliente}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        Edita un cliente
// ==================================================


public async actualizaCliente(req: Request, res: Response) {

    var IdPersona = req.body.IdPersona;
    var IdTipoDocumento = req.body.IdTipoDocumento;
    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var Documento = req.body.Documento;
    var Password = req.body.Password;
    var Telefono = req.body.Telefono;
    var Sexo = req.body.Sexo;
    var Observaciones = req.body.Observaciones;
    var FechaNac = req.body.FechaNac;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;
    var Calle = req.body.Calle;
    var Piso = req.body.Piso;
    var Departamento = req.body.Departamento;
    var Ciudad = req.body.Ciudad;
    var Pais = req.body.Pais;
    var Numero = req.body.Numero;    // 20
    var Objetivo = req.body.Objetivo;
    var Ocupacion = req.body.Ocupacion;
    var Horario = req.body.Horario;

    pool.query(`call bsp_editar_cliente('${IdPersona}','${IdTipoDocumento}','${Apellidos}','${Nombres}',
    '${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}',
    '${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},
    '${Objetivo}','${Ocupacion}','${Horario}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: "Ocurrio un problema" });
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
//       
// ==================================================
public async bajaProductoCarrito(req: Request, res: Response) {

    var IdProducto = req.params.IdProducto;
    var IdCliente = req.params.IdPersona;

    pool.query(`call bsp_baja_producto_carrito('${IdCliente}','${IdProducto}')`, function(err: any, result: any){

        if(err){
            logger.error("Error en bajaProductoCarrito - clientesController " + err );

            res.status(404).json(result);
            return;
        }
    
        if(result[1][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        res.json(result);
    })

}
// ==================================================
//       
// ==================================================
public async bajaPromocionCarrito(req: Request, res: Response) {

    var IdPromocion = req.params.IdPromocion;
    var IdCliente = req.params.IdPersona;    
    var IdSabor1 = req.params.IdSabor1;
    var IdSabor2 = req.params.IdSabor2;

    pool.query(`call bsp_baja_promocion_carrito('${IdCliente}','${IdPromocion}','${IdSabor1}','${IdSabor2}')`, function(err: any, result: any){

        if(err){
            logger.error("Error en bajaPromocionCarrito - clientesController " + err );

            res.status(404).json(result);
            return;
        }
    
        if(result[1][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        res.json(result);
    })

}
// ==================================================
//        
// ==================================================
public async buscarCliente(req: Request, res: Response): Promise<any> {
    var clienteBuscado = req.params.clienteBuscado;

    pool.getConnection(function(err: any, connection: any) {
        if (err) {
            logger.error("Error funcion bsp_buscar_cliente " + err);
            throw err; // not connected!
        }
       
        try {
            // Use the connection
            connection.query('call bsp_buscar_cliente(?)',[clienteBuscado], function(err: any, result: any){
                
                if(err){
                    logger.error("Error en bsp_buscar_cliente - err: " + err + " - result:" + result);
        
                    res.status(400).json(err);
                    return;
                }
        
                res.status(200).json(result[0]);

            });

        } catch (error) {
            logger.error("Error en bsp_buscar_cliente 2 - " + error);
            res.status(500).send('Error interno del servidor');
        } finally {
            connection.release();
        }
      });

}
}


const clientesController = new ClientesController;
export default clientesController;


// ==================================================
//   
// ==================================================

async function enviarMailBienvenida(pEmail: string) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'lebron-suplementos.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lebron - Suplementos Deportivos" <administracion@lebron-suplementos.com>', // sender address
    to: pEmail, // list of receivers
    subject: "[Lebron] ¡Bienvenido!", // Subject line
    text: "Gracias por crear su cuenta en Lebron - Suplementos deportivos", // plain text body
    html: "<a>https://lebron-suplementos.com/</a>", // html body
  });

}
