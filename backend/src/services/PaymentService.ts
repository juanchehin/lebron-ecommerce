const axios = require("axios");
require('dotenv').config()

class PaymentService {
  mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 

  constructor() {
  }

  async createPaymentMercadoPago(name: any, price: any, unit: any, img: any) {  
// recibimos las props que le mandamos desde el PaymentController
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${process.env.MP_ACCESS_TOKEN_TEST}`;

    console.log("url es : ",url)

// url a la que vamos a hacer los requests

    const items = [
      {
        id: "1234", 
// id interno (del negocio) del item
        title: name, 
// nombre que viene de la prop que recibe del controller
        description: "Dispositivo movil de Tienda e-commerce",
 // descripción del producto
        picture_url: "https://courseit.com.ar/static/logo.png", 
// url de la imágen del producto
        category_id: "1234",  
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
        name: "comprador",
        surname: "cliente",
        email: "sgmtucuman@gmail.com",
 // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
        phone: {
          area_code: "3865",
          number: "415369"
        },
        address: {
          zip_code: "1111",
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
      notification_url: "https://mp-checkout-api.herokuapp.com/webhook", 
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
}

//NOTA: TODAS las URLS que usemos tienen que ser reales, 
//si prueban con localhost, va a fallar

module.exports = PaymentService;
