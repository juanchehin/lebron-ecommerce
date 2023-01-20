import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { IItemCarritoStructure } from 'src/app/interfaces/IItemCarritoStructure.interface';

const ruta_img = environment.ruta_img;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  desde = 0;
  habilitarCostoEnvio = false;
  SubTotal = 0;
  costoEnvio = 0;
  Total = 0;
  direccionesCliente: any;
  banderaCarritoVacio = false;
  itemsCarrito: IItemCarritoStructure[] = [];
  itemsProductos: any[] = [];
  itemsPromociones: any[] = [];
  totalItemsCarrito = 0;
  IdPersona: any;
  totalUsuarios = 0;
  cargando = false;
  ruta_img_empty_cart = ruta_img + 'empty-cart.png';
  datosCompra: any[] = [];
  costoEnvioMP = 0;
  envioSeleccionado: any = -1;
  banderaSeleccionarEnvio: boolean = false;
  productosCarritoCliente: any[] = [];
  promocionesCarritoCliente: any[] = [];
  retencion_mp: any;
  retencion_mp_calculo: any;

  constructor(
    public usuariosService: UsuariosService,
    private clientesService: ClientesService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarCarrito();
  }

// ==================================================
// Carga las promociones y los productos que agrego
// el cliente al carrito de compras
// ==================================================

cargarCarrito() {
  
    this.clientesService.listarCarritoCliente(   )
               .subscribe( {
                next: (resp: any) => { 

                  if((resp[2] != undefined) && (resp[5][0].Mensaje == 'Ok') && (resp[5][0].Mensaje != undefined) && (resp[5][0].Mensaje != 'undefined')) 
                  {
                    this.totalItemsCarrito = resp[2][0].cantItemsCarrito;
                    this.productosCarritoCliente = resp[0];
                    this.promocionesCarritoCliente = resp[1];
                    var IdItem = 1;

                    // ***** Para productos *****
                    // cargo en el array los productos
                    if(this.productosCarritoCliente.length > 0)
                    {
                        this.productosCarritoCliente.forEach( (value) => {

                          this.itemsCarrito.push(
                            {
                              IdItem: IdItem,
                              IdProdProm: value.IdProductoSabor,
                              Nombre: value.Producto,
                              Tipo: 'P',
                              Sabor: value.Sabor,
                              IdSabor1: '-',
                              IdSabor2: '-',
                              Precio: value.PrecioVenta,
                              Cantidad: value.Cantidad,
                              SubTotal: value.SubTotal,
                            }
                            );
                            IdItem++;
                        });

                    }

                    // ***** Para promociones *****
                    // cargo en el array las promociones
                    if(this.promocionesCarritoCliente.length > 0)
                    {
                      this.promocionesCarritoCliente.forEach( (value) => {
                        this.itemsCarrito.push(
                          {
                            IdItem: IdItem,
                            IdProdProm: value.IdPromocion,
                            Nombre: value.Promocion,
                            Tipo: 'R',
                            Sabor: value.Sabores,
                            IdSabor1: value.IdSabor1,
                            IdSabor2: value.IdSabor2,
                            Precio: value.PrecioPromo,
                            Cantidad: value.Cantidad,
                            SubTotal: value.SubTotal,
                          }
                        );
                        IdItem++;
                      });
                    }
    
                    localStorage.setItem('items-carrito',String(this.totalItemsCarrito));

                    if(this.itemsCarrito.length <= 0 || this.totalItemsCarrito <= 0)
                    {
                      this.banderaCarritoVacio = true;
                      return;
                    }
                    this.banderaCarritoVacio = false;
    
                    this.costoEnvio = resp[3][0].costo_envio;
                    this.retencion_mp = resp[3][0].retencion_mp;
    
                    this.direccionesCliente = resp[4];
    
                    this.itemsCarrito.forEach((item:any) => {
                      this.Total += +item.SubTotal;
                    });

                    
    
                    this.retencion_mp_calculo = Math.floor((this.Total * this.retencion_mp)/100);

                    this.SubTotal = this.Total + this.retencion_mp_calculo;
        
                    this.Total = this.Total + +this.retencion_mp_calculo;

                    // Agrego las retenciones de MP a los items del carrito
                    // this.itemsCarrito.push(
                    //   {
                    //     IdItem: IdItem,
                    //     IdProdProm: 0,
                    //     Nombre: 'Retencion MP',
                    //     Tipo: '-',
                    //     Sabor: '-',
                    //     Precio: this.retencion_mp_calculo,
                    //     Cantidad: 1,
                    //     SubTotal: this.retencion_mp_calculo,
                    //   }
                    //   );

                  }
                  else
                  {
                    this.router.navigate(['/failure']);
                  }
                 
                  
                 },
                error: (err: any) => { 
                  this.router.navigate(['/failure']);
                 }
              });

  }



// =================================================
//        
// ==================================================
onChangeTipoEnvio(deviceValue: any){

  this.envioSeleccionado = deviceValue.value;

  if(deviceValue.value == -1)
  {
    this.habilitarCostoEnvio = false;
    return;
  }

  if(deviceValue.value == 0 && this.habilitarCostoEnvio == true)
  {
      this.Total -= +this.costoEnvio;
      this.habilitarCostoEnvio = false;
      return;
  }

  if(deviceValue.value > 0 && this.habilitarCostoEnvio != true)
  { 
    this.habilitarCostoEnvio = true;
    this.Total += +this.costoEnvio;
  }
  else
  {
    return;    
  }
} 


// =================================================
//        
// ==================================================

confirmarCompra( ) {

  if(this.envioSeleccionado < 0)
  {
    this.banderaSeleccionarEnvio = true;
    return;
  }

  this.cargando = true;
  this.datosCompra = [];

  this.itemsCarrito.forEach((item:any) => {

    this.datosCompra.push(
      { 
        IdProducto: item.IdItem,  // IdProductoSabor o promocion
        title: item.Nombre,
        unit_price: Number(this.retencion_mp_calculo),
        quantity: Number(1),
        picture_url: ''
      }
    );

    // Agrego las retenciones de MP
    this.datosCompra.push(
      { 
        IdProducto: 0,  // IdProductoSabor o promocion
        title: 'Retencion MP',
        unit_price: Number(item.Precio),
        quantity: Number(item.Cantidad),
        picture_url: ''
      }
      );

  });

  if(this.habilitarCostoEnvio == false){
    this.costoEnvioMP = 0;
  }
  else
  {
    this.costoEnvioMP = this.costoEnvio;
  }


  this.checkoutService.confirmarCompra( this.datosCompra, this.costoEnvioMP , this.envioSeleccionado ,this.Total )
    .subscribe({
      next: (resp: any) => { 
        
        if (this.validURL(resp.url)) {                
          window.location.href = resp.url;
        } else {                
          this.router.navigate(['/failure'])
          return;
        }
       },
      error: (err: any) => { 
        this.router.navigate(['/failure'])
       }
    });
}

// =================================================
//        
// ==================================================
eliminarItemCarrito(pIdItem: any){

  console.log("eliminar carr ",pIdItem);
  var pIdProductoSaborOrPromocion: any;
  var pTipo: any;
  var pIdSabor1: any;
  var pIdSabor2: any;
  var pPrecio: any;

  // Quitar el producto del array
  // delete this.itemsCarrito[IdProductoSabor];

  console.log("this.itemsCarrito carr ",this.itemsCarrito);

  this.itemsCarrito.forEach( (item, index) => {
    console.log("item ",item)
    console.log("index ",index)

    if(item.IdItem === pIdItem) 
    {
      this.itemsCarrito.splice(index,1);
      pIdProductoSaborOrPromocion = item.IdProdProm;
      pTipo = item.Tipo;
      pIdSabor1 = item.IdSabor1;
      pIdSabor2 = item.IdSabor2;
      pPrecio = item.Precio;
    }

  });

 

  console.log("this.itemsCarrito carr 2 ",this.itemsCarrito);

  // Caso productos
  if(pTipo == 'P')
  {
    this.clientesService.eliminarItemCarritoProducto( pIdProductoSaborOrPromocion )
    .subscribe({
      next: (resp: any) => { 
        
        this.totalItemsCarrito = resp[0][0].cantItemsCarrito;

        if ( resp[1][0].Mensaje === 'Ok') {
          
            this.Total = this.Total - +pPrecio;
            
            localStorage.setItem('items-carrito',String(this.totalItemsCarrito));
            
          } else {
            this.router.navigate(['/failure']);
          }
       },
      error: (err: any) => { 
        this.router.navigate(['/failure'])
       }
    });
  }

  // Caso promociones
  if(pTipo == 'R')
  {
    console.log("pasa pIdSabor1 ",pIdSabor1)
    console.log("pasa pIdSabor2 ",pIdSabor2)
    console.log("pasa pIdProductoSaborOrPromocion ",pIdProductoSaborOrPromocion)

    this.clientesService.eliminarItemCarritoPromocion( pIdProductoSaborOrPromocion, pIdSabor1,pIdSabor2 )
    .subscribe({
      next: (resp: any) => { 
        
        this.totalItemsCarrito = resp[0][0].cantItemsCarrito;

        if ( resp[1][0].Mensaje === 'Ok') {

          this.Total = this.Total - +pPrecio;
          localStorage.setItem('items-carrito',String(this.totalItemsCarrito));
          
        } else {
          this.router.navigate(['/failure']);
        }

        
        },
        error: (err: any) => { 
          this.router.navigate(['/failure'])
        }
      });
  }

  if(this.itemsCarrito.length <= 0)
  {
    this.banderaCarritoVacio = true;
    return;
  }
}

// =================================================
//        
// ==================================================
validURL(str: string) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUsuarios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarUsuarios();

}

}
