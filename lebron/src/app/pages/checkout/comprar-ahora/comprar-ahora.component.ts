import {  Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
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
    public authService: AuthService,
    public router: Router
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
  datosCompra: any[] = [];

  ngOnInit(): void {

    this.forma = new FormGroup({
      IdDireccion: new FormControl('0', Validators.required ),
      IdProducto: new FormControl(1, Validators.required ),
      Cantidad: new FormControl(null, Validators.required )
    });

    this.checkoutService.cantidad.subscribe((data : any)=>{
      this.Cantidad = data;
    });

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');


    if(this.IdPersona || (this.IdPersona.length == 0))
    { 
      this.authService.quoteIdPersona.subscribe((data : any)=>{
        this.IdPersona = data;

        if(Object.keys(this.IdPersona).length <= 0)
        { 
          this.IdPersona = localStorage.getItem('id');
        }
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

  this.datosCompra.push(
    { 
      IdProducto: this.producto.IdProducto,
      name: this.producto.Producto,
      price: this.Total,
      unit: this.Cantidad,
      img: ''
    }
    );
 
  console.log("datos compra es ; ",this.datosCompra)

  this.checkoutService.confirmarCompra( this.datosCompra , this.costoEnvio)
             .subscribe( (resp: any) => {

              // if ( resp.Mensaje === 'Ok') {
                
                window.location.href = resp.url;
                // this.router.navigate(resp.url);
              // } else {
               
              //   return;
              // }
             });
}
// =================================================
//        
// ==================================================
onChangeTipoEnvio(deviceValue: any){

  if(deviceValue.value != 0 && this.habilitarCostoEnvio != true)
  { 
    this.habilitarCostoEnvio = true;
    this.Total += +this.costoEnvio;
  }
  else
  {
    if(!(deviceValue.value != 0))
    {
      this.Total -= +this.costoEnvio;
      this.habilitarCostoEnvio = false;
    }
  }
} 

  // En caso de que se seleccione con envio a domicilio
  modificarTotal()
  { 
    this.Total += this.costoEnvio;
  }

}
