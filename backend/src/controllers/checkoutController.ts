import { Request, Response } from 'express';
import pool from '../database';
const axios = require("axios");
require('dotenv').config()

class CheckoutController {


// ==================================================
//        
// ==================================================
public async datosComprarAhora(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.pIdPersona;
    var pIdProducto = req.params.pIdProducto;

    pool.query(`call bsp_datos_comprar_ahora('${pIdPersona}','${pIdProducto}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async dameUsuario(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.pIdPersona;

    pool.query(`call bsp_dame_usuario('${pIdPersona}')`, function(err: any, result: any, fields: any){
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

  console.log("getMercadoPagoLink es : ");
    const datosCompra = req.body;
    const costoEnvio = req.params.costoEnvio;


    try {
      const checkout = await createPaymentMercadoPago( datosCompra , costoEnvio);

      console.log("checkout es : ",checkout);
      // return res.redirect(checkout.init_point); 
     //si es exitoso los llevamos a la url de Mercado Pago

      return res.status(200).json({url: checkout.init_point})
     // o si queres devolver la url al front 


    } catch (err) { 
      return res.status(500).json({
        error: true,
        msg: "Hubo un error con Mercado Pago" + err
      });
    }
}

// ==================================================
//  Aqui recibimos las notificacinoes de MP
// ==================================================
public async webhook(req: Request, res: Response): Promise<any> {
    console.log("pasa webhook")
    if (req.method === "POST") { 
        let body = ""; 
        req.on("data", chunk => {  
          body += chunk.toString();
          console.log("pasa webhook 2 : ",body)
        });
        req.on("end", () => {  
          console.log(body, "webhook response"); 
          res.end("ok");
        });
      }

      console.log("pasa webhook 3 : ")
      return res.status(200);
}

}


const checkoutController = new CheckoutController;
export default checkoutController;

async function createPaymentMercadoPago( items : any, costoEnvio: any) {
    const mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 

        
    const url = `${mercadoPagoUrl}/preferences?access_token=${process.env.MP_ACCESS_TOKEN_PROD}`;

    console.log("url : ",url)
        const preferences = { 
          items, 
          external_reference: "Lebron - Suplementos", 
          payer: { 
    // información del comprador, si estan en producción tienen que //traerlos del request
    //(al igual que hicimos con el precio del item) 
            name: "juan",
            surname: "chehin",
            email: "chehin238@gmail.com",
     // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
            phone: {
              area_code: "3865",
              number: "415369"
            },
            address: {
              zip_code: "4000",
              street_name: "False",
              street_number: "123"
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
            success: `${process.env.URL_FRONT}/pago-exitoso`, 
    // url que va a redireccionar si sale todo bien
            pending: `${process.env.URL_FRONT}/pendiente`, 
    // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
            failure: `${process.env.URL_FRONT}/failure` 
    // url a la que va a redireccionar si falla el pago
          }, 
          notification_url: `${process.env.URL_BACK}/api/checkout/webhook`, 
          auto_return: "approved" 
        };

        try {
          const request = await axios.post(url, preferences, {
            headers: { 
              "Content-Type": "application/json"
            }
          });
    
          return request.data; 
        } catch (e) {
          console.log(e);
        }
}