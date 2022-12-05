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
  envioSeleccionado: any = -1;
  cargando = false;
  IdProducto: any;
  IdPersona: any;
  direccionesCliente: any;
  costoEnvio: any = 0;
  Total = 0;
  SubTotal = 0;
  selectedDevice: any;
  datosCompra: any[] = [];
  costoEnvioMP = 0;
  banderaSeleccionarEnvio: boolean = false;

  producto: any = '';
  precioVenta: any = '';


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
    
    this.checkoutService.dameDatosComprarAhora( this.IdPersona,this.IdProducto  )
      .subscribe( (resp: any) => {

        console.log("resp : ", resp);

        this.direccionesCliente = resp[0];

        this.producto = resp[1][0].Producto;
        this.precioVenta = resp[1][0].PrecioVenta;

        this.costoEnvio = resp[2][0].costo_envio;

        this.SubTotal = this.precioVenta * this.Cantidad;
        this.Total = this.SubTotal;

   });
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

  this.datosCompra.push(
    { 
      IdProducto: this.producto.IdProducto,
      title: this.producto.Producto,
      unit_price: Number(this.Total),
      quantity: this.Cantidad,
      picture_url: ''
    }
  );

  if(this.habilitarCostoEnvio == false){
    this.costoEnvioMP = 0;
  }
  else
  {
    this.costoEnvioMP = this.costoEnvio;
  }
 
  this.checkoutService.confirmarCompra( this.datosCompra , this.costoEnvio, this.envioSeleccionado, this.Total)
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

  // En caso de que se seleccione con envio a domicilio
  modificarTotal()
  { 
    this.Total += this.costoEnvio;
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
