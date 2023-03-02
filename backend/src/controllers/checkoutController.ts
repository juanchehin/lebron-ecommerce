import { Request, Response } from 'express';
import pool from '../database';
const axios = require("axios");
require('dotenv').config()
var https = require('follow-redirects').https;
const logger = require("../utils/logger").logger;

class CheckoutController {


// ==================================================
//        
// ==================================================
public async datosComprarAhoraProducto(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.pIdPersona;
    var pIdProducto = req.params.pIdProducto;

    pool.query(`call bsp_datos_comprar_ahora_producto('${pIdPersona}','${pIdProducto}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}
// ==================================================
//        
// ==================================================
public async datosComprarAhoraPromocion(req: Request, res: Response): Promise<void> {
  var pIdPersona = req.params.pIdPersona;
  var pIdPromocion = req.params.pIdPromocion;

  pool.query(`call bsp_datos_comprar_ahora_promocion('${pIdPersona}','${pIdPromocion}')`, function(err: any, result: any, fields: any){
      if(err){
          res.status(404).json({ text: err });
          return;
      }
      res.status(200).json(result);
  })
}

// ==================================================
//     
// ==================================================
public async getMercadoPagoLink(req: Request, res: Response): Promise<any> {

    const datosCompra = req.body;
    const costoEnvio = req.params.costoEnvio;
    const pIdPersona = req.params.IdPersona;
    const pIdDireccion = req.params.pIdDireccion;
    const pTotal = req.params.pTotal;

    pool.query(`call bsp_alta_pedido('${pIdPersona}','${pIdDireccion}','${pTotal}')`, async function(err: any, result: any, fields: any){
      
      if(err || result[0][0].Mensaje != 'Ok'){
          logger.error("Error en alta pedido - getMercadoPagoLink - checkoutController " + err + " " + result[0][0].Mensaje);
          res.status(400).json({ text: err });
          return;
      }

      var pIdPedido = result[0][0].pIdPedido;

      const arrayDatosComprador = new Array(
        pIdPersona,
        result[1][0].Apellidos,
        result[1][0].Nombres,
        result[1][0].Email,
        result[1][0].Telefono,

        result[2][0].Calle,
        result[2][0].Numero,
        result[2][0].CP
      );

      try {
        const checkout = await createPaymentMercadoPago( datosCompra , costoEnvio, pIdPedido,arrayDatosComprador);
        // guardar el pedido pendiente en la BD
        // return res.redirect(checkout.init_point); 
       //si es exitoso los llevamos a la url de Mercado Pago
  
        return res.status(200).json({url: checkout.init_point})
       // o si queres devolver la url al front 
  
  
      } catch (err) { 
        logger.error("Error en createPaymentMercadoPago - getMercadoPagoLink - checkoutController " + err);

        return res.status(500).json({
          error: true,
          msg: "Hubo un error con Mercado Pago" + err
        });
      }

      // res.status(200).json(result);
  })


    
}

// ==================================================
//  **SIN USO EN LOCALHOST** 
// Aqui recibimos las notificacinoes de MP 
// ==================================================
public async webhook(req: Request, res: Response) {

  if (req.query.type === 'payment') {
    const paymentId = req.query['data.id'];
    
    var options = {
      'method': 'GET',
      'hostname': 'api.mercadopago.com',
      'path': '/v1/payments/'+ paymentId,
      'headers': {
        'Authorization': 'Bearer ' + process.env.MP_VEND_ACCESS_TOKEN_TEST
      },
      'maxRedirects': 20
    };
    
    var request = https.request(options, function (res: any) {
        var body = '';
         res.on('data', function(d: any) {
             body += d;
         });
         return res.on('end', function() {
   
             // Data reception is done, do whatever with it!
             var parsed = JSON.parse(body);
   
             if(parsed.status == 404)
             {
                logger.error("Error en webhook - parsed.status - checkoutController " + parsed.status);
                return;
             }
             const idOrden = parsed.external_reference;
   
             pool.query(`call bsp_dame_pedido_id('${idOrden}')`, function(err: any, result: any) {
               
               if(err || result[2][0].Mensaje != 'Ok'){
                logger.error("Error en webhook - bsp_dame_pedido_id - checkoutController");
                 return;
               }
               var estadoPedidoBD = result[0][0].EstadoPedido;

               if(estadoPedidoBD == 'C' || estadoPedidoBD == 'E')
               {
                  logger.error("Error en webhook - checkoutController - estado pedido : " + estadoPedidoBD);
                  return;
               }
   
               var montoTotalBD = result[1][0].MontoTotal;
   
               if (Number(montoTotalBD) === Number(parsed.transaction_amount)) {
                 if (parsed.status === 'approved') {
                   pool.query(`call bsp_aprobar_pedido('${idOrden}','${paymentId}')`, async function(err: any, result: any, fields: any){
   
                     if(err){
                        logger.error("Error en webhook - bsp_aprobar_pedido - checkoutController " + err);
                        return;
                     }
                   })
                 }
               }
               
             })             
         });
    });
    
    res.status(200).json({ text: 'Ok'});        

    request.end();
  }

}

}


const checkoutController = new CheckoutController;
export default checkoutController;

async function createPaymentMercadoPago( items : any, costoEnvio: any, pIdPedidos: any,arrayDatosComprador: any) {
    const mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 

    const url = `${mercadoPagoUrl}/preferences?access_token=${process.env.MP_VEND_ACCESS_TOKEN_TEST}`;

    const preferences = { 
          items, 
          external_reference: pIdPedidos, 
          payer: { 
          // información del comprador
            name: arrayDatosComprador[2],
            surname: arrayDatosComprador[1],
            email: arrayDatosComprador[3],
     // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
            phone: {
              area_code: "",
              number: arrayDatosComprador[4]
            },
            address: {
              zip_code: arrayDatosComprador[7],
              street_name: arrayDatosComprador[5],
              street_number: arrayDatosComprador[6]
            }
          },
          shipments:{
            cost: Number(costoEnvio),
            mode: "not_specified",
          },
          payment_methods: { 
    // declaramos el método de pago y sus restricciones
            excluded_payment_methods: [ 
    // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
              {
                id: "amex"
              }
            ],
            excluded_payment_types: [{ id: "atm" }], 
    // aca podemos excluir TIPOS de pagos, es un array de objetos
            installments: 6, 
    // limite superior de cantidad de cuotas permitidas
            default_installments: 6 
    // la cantidad de cuotas que van a aparecer por defecto
          }, 
          back_urls: {
    // declaramos las urls de redireccionamiento
            success: `${process.env.URL_FRONT}/checkout/pago-exitoso`, 
    // url que va a redireccionar si sale todo bien
            pending: `${process.env.URL_FRONT}/pendiente`, 
    // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
            failure: `${process.env.URL_FRONT}/failure` 
    // url a la que va a redireccionar si falla el pago
          }, 
          notification_url: `${process.env.URL_WEBHOOK}/webhook`, 
          auto_return: "approved" 
        };

        try {
          const request = await axios.post(url, preferences, {
            headers: { 
              "Content-Type": "application/json"
            }
          });
    
          return request.data; 
        } catch (e: any) {

          
          var IdUsuario = arrayDatosComprador[0];
          
          var dataErrorCode = e.response.data.status || '';
          var dataStatusText = e.response.statusText || '';
          var message = e.response.data.message || '';

          logger.error("Error en createPaymentMercadoPago - checkoutController " + message + "; StatusCode : " + dataStatusText + "; errorCode : " + dataErrorCode);
          
            pool.query(`call bsp_alta_log('${IdUsuario}','${dataStatusText}','checkoutController','${dataErrorCode}','createPaymentMercadoPago','${message}')`, function(err: any, result: any, fields: any){
              if(err){
                  return;
              }
          })
        }
}