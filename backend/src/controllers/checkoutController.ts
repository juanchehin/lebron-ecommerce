import { Request, Response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');
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
//        Inserta un usuario
// ==================================================
public async altaUsuario(req: Request, res: Response) {

    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var DNI = req.body.DNI;
    var Pass = req.body.Pass;
    var Telefono = req.body.Telefono;
    var Observaciones = req.body.Observaciones;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;    
    var Direccion = req.body.Direccion;
    var FechaNac = req.body.FechaNac;

    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(Pass, salt, async function(err: any, hash: any) {

            pool.query(`call bsp_alta_usuario('${Apellidos}','${Nombres}','${hash}','${Telefono}','${DNI}','${Correo}','${Direccion}','${FechaNac}','${Usuario}'},'${Observaciones}')`, function(err: any, result: any, fields: any){        if(err){
                    console.log("error : ", err);
                    res.status(404).json({ text: "Ocurrio un problema" });
                    return;
                }
                
                if(result[0][0].Mensaje === 'La persona ya se encuentra cargada'){
                    return res.json({
                        Mensaje: result[0][0].Mensaje,
                        pIdPersona: result[1][0].IdPersona
                    });
                }
            
                if(result[0][0].Mensaje !== 'Ok'){
                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }

                return res.json({ Mensaje: 'Ok' });
            })

        });
    });

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
//     confirmar compra - mercadopago - SIN USO
// ==================================================
public async confirmarCompra(req: Request, res: Response): Promise<void> {

   

    var Monto = req.body.Monto;

    console.log("confirmar compra : ",Monto)
    
    // Enviar datos mercado pago

    var mercadopago = require('mercadopago');
        mercadopago.configure({
            access_token: 'APP_USR-6370868698271500-110215-0fe0859ab28cb28c69b885a3de895833-190646812'
        });

        var preference = {
        items: [
            {
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
            }
        ]
    };

    mercadopago.preferences.create(preference)

    // Enviar al front que pase a el checkout de MP

    // agregar venta y pedido a la BD
}

// ==================================================
//     
// ==================================================
public async getMercadoPagoLink(req: Request, res: Response): Promise<any> {

    const { IdProducto, name, price, unit, img } = req.body[0]; 

    try {
      const checkout = await createPaymentMercadoPago(
        IdProducto,
        name, // nombre del producto o servicio
        price, //precio del producto o servicio
        unit,  //cantidad que estamos vendiendo
        img  // imagen de referencia del producto o servicio
      );

      // return res.redirect(checkout.init_point); 
     //si es exitoso los llevamos a la url de Mercado Pago

      return res.json({url: checkout.init_point})
     // o si queres devolver la url al front 


    } catch (err) { 
// si falla devolvemos un status 500

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
    if (req.method === "POST") { 
        let body = ""; 
        req.on("data", chunk => {  
          body += chunk.toString();
        });
        req.on("end", () => {  
          console.log(body, "webhook response"); 
          res.end("ok");
        });
      }
      return res.status(200); 
    
}



}


const checkoutController = new CheckoutController;
export default checkoutController;

async function createPaymentMercadoPago(IdProducto: any,name: any, price: any, unit: any, img: any) {
    const mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 

    // recibimos las props que le mandamos desde el PaymentController
        const access_token = process.env.MP_ACCESS_TOKEN_PROD;
        
        const url = `${mercadoPagoUrl}/preferences?access_token=${access_token}`;
    
    // url a la que vamos a hacer los requests
    
        const items = [
          {
            id: IdProducto, 
    // id interno (del negocio) del item
            title: name, 
    // nombre que viene de la prop que recibe del controller
            description: name,
     // descripción del producto
            picture_url: "", 
    // url de la imágen del producto
            category_id: "1",  
    // categoría interna del producto (del negocio)
            quantity: parseInt(unit), 
    // cantidad, que tiene que ser un intiger
            currency_id: "ARS", 
    // id de la moneda, que tiene que ser en ISO 4217
            unit_price: parseFloat(price)
     // el precio, que por su complejidad tiene que ser tipo FLOAT
          }
        ];  
    
        const preferences = { 
    // declaramos las preferencias de pago
          items, 
    // el array de objetos, items que declaramos más arriba
          external_reference: "Lebron - Suplementos", 
    // referencia para identificar la preferencia, puede ser practicamente cualquier valor
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
            success: `${process.env.URL_FRONT}/success`, 
    // url que va a redireccionar si sale todo bien
            pending: `${process.env.URL_FRONT}/pending`, 
    // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
            failure: `${process.env.URL_FRONT}/error` 
    // url a la que va a redireccionar si falla el pago
          }, 
          notification_url: `${process.env.URL_FRONT}/webhook`, 
    // declaramos nuestra url donde recibiremos las notificaciones
          auto_return: "approved" 
    // si la compra es exitosa automaticamente redirige a "success" de back_urls
        };
    
        try {
          const request = await axios.post(url, preferences, {
     // hacemos el POST a la url que declaramos arriba, con las preferencias
            headers: { 
    // y el header, que contiene content-Type
              "Content-Type": "application/json"
            }
          });
    
          return request.data; 
    // devolvemos la data que devuelve el POST
        } catch (e) {
          console.log(e); 
    // mostramos error en caso de que falle el POST
        }
}