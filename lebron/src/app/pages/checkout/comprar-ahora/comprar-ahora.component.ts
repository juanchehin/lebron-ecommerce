import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comprar-ahora',
  templateUrl: './comprar-ahora.component.html',
  styleUrls: ['./comprar-ahora.component.css']
})
export class ComprarAhoraComponent implements OnInit  {
  retencion_mp: any;
  retencion_mp_calculo: any;
  forma!: FormGroup;
  cantidadProducto: any = 1;
  habilitarCostoEnvio = false;
  envioSeleccionado: any = -1;
  cargando = false;
  IdProducto: any;
  IdPromocion: any;
  direccionesCliente: any;
  costoEnvio: any = 0;
  Total = 0;
  SubTotal = 0;
  selectedDevice: any;
  datosCompra: any[] = [];
  costoEnvioMP = 0;
  banderaSeleccionarEnvio: boolean = false;
  cantidadMostrar = 0;
  sabor: any;
  // para el caso de la promo
  saborProd1: any;
  saborProd2: any;
  cantidadPromocion: any = 1;

  producto: any = '';
  precioVenta: any = '';

  constructor(
    public checkoutService: CheckoutService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) { }

 


  ngOnInit(): void {
    console.log("pasa comprar ahora")

    this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');
    this.IdPromocion = this.activatedRoute.snapshot.paramMap.get('IdPromocion');

    this.forma = new FormGroup({
      IdDireccion: new FormControl('0', Validators.required ),
      IdProducto: new FormControl(1, Validators.required ),
      Cantidad: new FormControl(null, Validators.required )
    });

    if(this.IdProducto)
    {
      this.checkoutService.cantidadProducto.subscribe((data : any)=>{
        this.cantidadProducto = data;
        this.cantidadMostrar = data;
      });

      this.checkoutService.saborProducto.subscribe((data : any)=>{
        this.sabor = data;
      });
    }
    else{
      this.checkoutService.cantidadPromocion.subscribe((data : any)=>{
        this.cantidadPromocion = data;
        this.cantidadMostrar = data;
      });

      this.checkoutService.saborPromocionProducto1.subscribe((data : any)=>{
        this.saborProd1 = data;
      });

      this.checkoutService.saborPromocionProducto2.subscribe((data : any)=>{
        this.saborProd2 = data;
      });

      this.sabor = this.saborProd1 + ' - ' + this.saborProd2;


    }
    
    
    this.dameDatosComprarAhora();
  }

  // ==============================
  //  Trae los datos del producto, costo de envio,
  //  y las direcciones del cliente
  // ===============================
  dameDatosComprarAhora(){
    console.log("pasa datos comprar ahora")
    if(this.IdProducto)
    {
      this.checkoutService.dameDatosComprarAhora( this.IdProducto ,'producto' )
        .subscribe( {
          next: (resp: any) => {
    
            this.direccionesCliente = resp[0];
  
            this.producto = resp[1][0].Producto;
            this.precioVenta = resp[1][0].PrecioVenta;  
            this.costoEnvio = resp[2][0].costo_envio;
            this.retencion_mp = resp[2][0].retencion_mp;

            this.SubTotal = this.precioVenta * this.cantidadProducto;

            this.retencion_mp_calculo = Math.floor((this.SubTotal * this.retencion_mp)/100);

            this.Total = this.SubTotal + +this.retencion_mp_calculo;

          },
          error: () => { this.router.navigate(['/failure']); }
        });
    }
    else
    {
      this.checkoutService.dameDatosComprarAhora(this.IdPromocion ,'promocion' )
        .subscribe( {
          next: (resp: any) => {

          this.direccionesCliente = resp[0];

          this.producto = resp[1][0].Promocion;
          this.precioVenta = resp[1][0].precioPromo;
          this.costoEnvio = resp[2][0].costo_envio;
          this.retencion_mp = resp[2][0].retencion_mp;

          this.SubTotal = this.precioVenta * this.cantidadProducto;

          this.retencion_mp_calculo = Math.floor((this.SubTotal * this.retencion_mp)/100);

          this.Total = this.SubTotal + +this.retencion_mp_calculo;
        },
        error: () => { this.router.navigate(['/failure']);}
      });

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

  if(this.SubTotal <= 0 || this.Total <= 0)
  {
    this.router.navigate(['/failure']);
    return;
  }

  this.cargando = true;

  if(this.IdProducto)
  {
    this.datosCompra.push(
      { 
        IdProducto: this.IdProducto,
        title: this.producto,
        unit_price: Number(this.Total),
        quantity: Number(1),
        picture_url: ''
      }
    );

  }
  else
  {
    this.datosCompra.push(
      { 
        IdPromocion: this.IdPromocion,
        title: this.producto,
        unit_price: Number(this.Total),
        quantity: Number(1),
        picture_url: ''
      }
    );
  }

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
