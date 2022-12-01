import {  Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comprar-ahora',
  templateUrl: './comprar-ahora.component.html',
  styleUrls: ['./comprar-ahora.component.css']
})
export class ComprarAhoraComponent implements OnInit  {

  constructor(
    public checkoutService: CheckoutService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  forma!: FormGroup;
  Cantidad: any = 1;
  habilitarCostoEnvio = false;
  cargando = false;
  IdProducto: any;
  IdPersona: any;
  direccionesCliente: any;
  costoEnvio: any = 0;
  producto: any;
  Total = 0;
  SubTotal = 0;
  selectedDevice: any;

  ngOnInit(): void {

    this.forma = new FormGroup({
      IdDireccion: new FormControl('0', Validators.required ),
      IdProducto: new FormControl(1, Validators.required ),
      Cantidad: new FormControl(null, Validators.required )
    });

    this.checkoutService.cantidad.subscribe((data : any)=>{
      console.log("data : ",data)
      this.Cantidad = data;
      console.log("this.Cantidad : ",this.Cantidad)
    });

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

    console.log("this.IdPersona 2  : ",this.IdPersona)

    if(this.IdPersona || (this.IdPersona.length == 0))
    { 
      console.log("pasa if  : ")
      this.authService.quoteIdPersona.subscribe((data : any)=>{
        this.IdPersona = data;
        console.log("this.IdPersona 54  : ",this.IdPersona)
      });
    }

    this.dameDatosComprarAhora();
  }

  // ==============================
  //  Trae los datos del producto, costo de envio,
  //  y las direcciones del cliente
  // ===============================
  dameDatosComprarAhora(){

    this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');
    
    console.log("this.persona : ",this.IdPersona)

    this.checkoutService.dameDatosComprarAhora( this.IdPersona,this.IdProducto  )
      .subscribe( (resp: any) => {

        console.log("resp : ", resp);

        this.direccionesCliente = resp[0];
        this.producto = resp[1][0];
        this.costoEnvio = resp[2][0].costo_envio;

        this.SubTotal = this.producto.PrecioVenta * this.Cantidad;
        this.Total = this.SubTotal;

   });
  }

// =================================================
//        
// ==================================================

confirmarCompra( ) {

  this.cargando = true;
 
  const datosCompra = new Array(
    this.Total
  );

  this.checkoutService.confirmarCompra( datosCompra )
             .subscribe( (resp: any) => {

              if ( resp.Mensaje === 'Ok') {
                
                // this.router.navigate(['/mantenimiento/clientes']);
              } else {
               
                return;
              }
             });
}
// =================================================
//        
// ==================================================
onChangeTipoEnvio(deviceValue: any){
  console.log("onChangeTipoEnvio" , deviceValue.value);

  if(deviceValue.value != 0)
  { 
    this.habilitarCostoEnvio = true;
    this.Total += +this.costoEnvio;
  }
  else
  {
    this.habilitarCostoEnvio = false;
  }
} 
  // En caso de que se seleccione con envio a domicilio
  modificarTotal()
  { 
    this.Total += this.costoEnvio;
  }

}
