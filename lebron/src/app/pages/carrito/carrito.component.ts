import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ClasesDisponibles = 0;
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

  constructor(
    public usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService
  ) {
   }

  ngOnInit() {
    this.cargarCarrito();
  }

// ==================================================
// Carga
// ==================================================

cargarCarrito() {
  console.log("pasa cargarCarrito");

  
    this.clientesService.listarCarritoCliente(   )
               .subscribe( (resp: any) => {

                console.log("resp carerito es : ",resp)

                this.totalItemsCarrito = resp[1][0].cantProductosCarrito;

                this.itemsCarrito = resp[0];

                console.log("resp[0] carerito es : ",resp[0])

                console.log("resp[0] carerito es : ",this.itemsCarrito.length)

                if(this.itemsCarrito.length <= 0 || this.totalItemsCarrito <= 0)
                {
                  // mostrar mensaje de 'no tienes productos en tu carrito'
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

  if(deviceValue.value != 0)
  { 
    this.habilitarCostoEnvio = true;
    this.Total += +this.costoEnvio;
  }
  else
  {
    this.Total -= +this.costoEnvio;
    this.habilitarCostoEnvio = false;
  }
} 

}
