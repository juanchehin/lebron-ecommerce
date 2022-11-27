import {  Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductoDetalleComponent } from '../../producto-detalle/producto-detalle.component';

@Component({
  selector: 'app-comprar-ahora',
  templateUrl: './comprar-ahora.component.html',
  styleUrls: ['./comprar-ahora.component.css']
})
export class ComprarAhoraComponent implements OnInit  {

  constructor(
    public checkoutService: CheckoutService,
    public activatedRoute: ActivatedRoute
  ) { }

  Cantidad: any = 1;
  habilitarCostoEnvio = false;
  IdProducto: any;
  IdPersona: any;
  direccionesCliente: any;
  costoEnvio: any;
  producto: any;
  Total = 0;

  ngOnInit(): void {
    

    this.checkoutService.cantidad.subscribe((data : any)=>{
      console.log("data oninit es : ",data);
      this.Cantidad = data;
    });

    this.dameDatosComprarAhora();
    console.log("this.Cantidad es : ",this.Cantidad);
  }

  // ==============================
  //  Trae los datos del producto, costo de envio,
  //  y las direcciones del cliente
  // ===============================
  dameDatosComprarAhora(){

    console.log("this.Cantidad dameDatosComprarAhora es : ",this.Cantidad);

    this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

    this.checkoutService.dameDatosComprarAhora( this.IdPersona,this.IdProducto  )
      .subscribe( (resp: any) => {

        console.log("resp : ", resp);

        this.direccionesCliente = resp[0];
        this.producto = resp[1];
        this.costoEnvio = resp[2];

        // this.Total = this.producto.PrecioVenta * cantidadProducto;

   });
  }
  
  // En caso de que se seleccione con envio a domicilio
  modificarTotal()
  { 
    this.Total += this.costoEnvio;
  }

}
