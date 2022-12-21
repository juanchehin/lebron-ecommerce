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

                    // cargo en el array los productos
                    if(this.productosCarritoCliente.length > 0)
                    {
                        this.productosCarritoCliente.forEach( (value) => {

                          this.itemsCarrito.push(
                            {
                              IdItem: value.IdProductoSabor,
                              Nombre: value.Producto,
                              Sabor: value.Sabor,
                              Precio: value.PrecioVenta,
                              Cantidad: value.Cantidad,
                              SubTotal: value.SubTotal,
                            }
                            );
                        });

                    }

                    
                    // cargo en el array las promociones
                    if(this.promocionesCarritoCliente.length > 0)
                    {
                      this.promocionesCarritoCliente.forEach( (value) => {
                        this.itemsCarrito.push(
                          {
                            IdItem: value.IdPromocion,
                            Nombre: value.Promocion,
                            Sabor: '-',
                            Precio: value.PrecioPromo,
                            Cantidad: value.Cantidad,
                            SubTotal: value.SubTotal,
                          }
                          );
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
    
                    this.direccionesCliente = resp[4];
    
                    this.itemsCarrito.forEach((item:any) => {
                      this.Total += +item.SubTotal;
                    });
    
                    this.SubTotal = this.Total;
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
        IdProducto: item.IdProducto,
        title: item.Producto,
        unit_price: Number(item.PrecioVenta),
        quantity: item.Cantidad,
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
eliminarItemCarrito(IdProducto: string){
  
  this.clientesService.eliminarItemCarrito(  IdProducto )
      .subscribe( (resp: any) => {

        if ( resp.Mensaje === 'Ok') {
          this.cargarCarrito();
        } else {
          this.router.navigate(['/failure']);
        }

  

 });
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
}
