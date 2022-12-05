import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

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
  itemsCarrito!: any;
  totalItemsCarrito = 0;
  IdPersona: any;
  totalUsuarios = 0;
  cargando = true;
  ruta_img_empty_cart = ruta_img + 'empty-cart.png';
  datosCompra: any[] = [];
  costoEnvioMP = 0;
  envioSeleccionado: any = -1;
  banderaSeleccionarEnvio: boolean = false;

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
// Carga
// ==================================================

cargarCarrito() {
  
    this.clientesService.listarCarritoCliente(   )
               .subscribe( (resp: any) => {

                this.totalItemsCarrito = resp[1][0].cantProductosCarrito;

                this.itemsCarrito = resp[0];

                localStorage.setItem('items-carrito',String(this.totalItemsCarrito));

                if(this.itemsCarrito.length <= 0 || this.totalItemsCarrito <= 0)
                {
                  this.banderaCarritoVacio = true;
                  return;
                }
                this.banderaCarritoVacio = false;

                this.costoEnvio = resp[2][0].costo_envio;

                this.direccionesCliente = resp[3];

                this.itemsCarrito.forEach((item:any) => {
                  this.Total += +item.SubTotal;
                });

                this.SubTotal = this.Total;
                

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

  console.log("envio seleccinado ",this.envioSeleccionado)

  if(this.envioSeleccionado < 0)
  {
    this.banderaSeleccionarEnvio = true;
    return;
  }

  this.cargando = true;

  console.log("htis.datosCompra ",this.datosCompra)

  this.datosCompra = [];

  console.log("htis.itemscarrot ",this.itemsCarrito)
  console.log("htis.datosCompra 2",this.datosCompra)

  this.itemsCarrito.forEach((item:any) => {

    console.log("item es : ",item)    

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
      error: () => { this.router.navigate(['/failure']) }
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
