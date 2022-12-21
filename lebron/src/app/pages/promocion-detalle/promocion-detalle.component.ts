import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-promocion-detalle',
  templateUrl: './promocion-detalle.component.html',
  styleUrls: ['./promocion-detalle.component.css']
})
export class PromocionDetalleComponent implements OnInit {

  desde = 0;

  cargando = true;
  IdPromocion: any;
  IdPersona: any;
  mensajeStockProducto = false;
  mensajeCantidad = false;
  //
  url_imagenes_producto = url_imagenes_producto;
  public imgTemp: any = 'lebron_lebron.png';

  // producto 1
  IdProducto1: any;
  Producto1: any;
  stockSaborProducto1 = 0; 
  saboresProd1: any;
  idSaborSeleccionado1 = 0;
  Cantidad: any = 1;

  //
  IdProducto2: any;
  Producto2: any;
  stockSaborProducto2 = 0; 
  saboresProd2: any;
  idSaborSeleccionado2 = 0
  // ==============================
  urlImgPromo: any;
  cantidad = 1;
  descripcionPromo = '-';
  promocion: any;
  imagenesPromocion: any;
  precioPromo: any;
  // ==============================
  urlImg1: any;
  urlImg2: any;
  urlImg3: any;
  urlImg4: any;
  urlImg5: any;
  urlImg6: any;

  constructor(
    public usuariosService: UsuariosService,
    public authService: AuthService,
    public productosService: ProductosService,
    public checkoutService: CheckoutService,
    public activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarIdPersona();
    this.IdPromocion = this.activatedRoute.snapshot.paramMap.get('IdProducto');

    // this.changeCantidad();
    this.cargarDatosProductos();    
    
  }

  // ***
  cargarIdPersona() {
    this.authService.quoteIdPersona.subscribe((dataIdPersona : any) => { 

      this.IdPersona = dataIdPersona;

      if(Object.keys(this.IdPersona).length <= 0)
      { 
        
        this.IdPersona = localStorage.getItem('id');
      }
    });

  }

  // =================================================================
  // changeCantidad() {
  //   this.checkoutService.changeCantidad(this.cantidad);
  // }
  

  // =================================
  // Carga los datos de los productos de la promocion
// =================================

cargarDatosProductos(){

  this.IdPromocion = this.activatedRoute.snapshot.paramMap.get('IdPromocion');

    this.productosService.dameDatosPromocion(this.IdPromocion,this.idSaborSeleccionado1,this.idSaborSeleccionado2)
    .subscribe( {
      next: (resp: any) => { 
      
        if ( resp[0][0].Mensaje != 'La promocion no cuenta con stock suficiente' && resp[6][0].Mensaje === 'Ok' && resp[0].length > 0 ) {

          if(!resp[0][0].Descripcion || resp[0][0].Descripcion == 'null' || resp[0][0].Descripcion == null)
          {
            this.descripcionPromo = '-';
          }
          else
          {
            this.descripcionPromo = resp[0][0].Descripcion;
          }

          // Datos de la promocion
          this.promocion = resp[0][0].Promocion;
          this.descripcionPromo = resp[0][0].Descripcion;
          this.precioPromo = resp[0][0].precioPromo;

          // Datos producto 1
          this.IdProducto1 = resp[1][0].IdProducto;
          this.Producto1 = resp[1][0].Producto;
          this.stockSaborProducto1 = resp[1][0].StockSabor1;
          this.saboresProd1 = resp[2];

          // Datos producto 2
          this.IdProducto2 = resp[3][0].IdProducto;
          this.Producto2 = resp[3][0].Producto;
          this.stockSaborProducto2 = resp[3][0].StockSabor2;
          this.saboresProd2 = resp[4];

          this.imagenesPromocion = resp[5];

          for (let i = 0; i < 7; i++) {
            
            if(this.imagenesPromocion[i] == undefined || this.imagenesPromocion[i] == 'undefined' || !(this.imagenesPromocion[i].Archivo) || this.imagenesPromocion[i].Archivo == 'null' || this.imagenesPromocion[i].Archivo == null || this.imagenesPromocion[i].Archivo == undefined || this.imagenesPromocion[i].Archivo == 'undefined') 
            {
              var archivo = this.imgTemp;    
            }
            else
            {
              var archivo = this.imagenesPromocion[i].Archivo
            }

            switch (i) {
              case 0:
                this.urlImg1 = this.url_imagenes_producto + archivo;
                break;
              case 1:
                this.urlImg2 = this.url_imagenes_producto + archivo;
                break;
              case 2:
                this.urlImg3 = this.url_imagenes_producto + archivo;
                break;
              case 3:
                this.urlImg4 = this.url_imagenes_producto + archivo;
                break;
              case 4:
                this.urlImg5 = this.url_imagenes_producto + archivo;
                break;
              case 5:
                this.urlImg6 = this.url_imagenes_producto + archivo;
                break;
            }
          }
          

        } else {
          this.router.navigate(['/failure']);
        }
        return;
       },
      error: () => { this.router.navigate(['/failure']); }
    });

     
  }

  // =================================
  agregarCarrito()
  { 
    if(this.stockSaborProducto1 <= 0 || this.stockSaborProducto2 <= 0)
    {
      this.mensajeStockProducto = true;
      return;
    }
    this.mensajeStockProducto = false;
    
    const datosCarrito = new Array(
      this.IdPromocion,
      this.IdPersona,
      this.cantidad
    )

    this.clientesService.agregarItemCarrito(datosCarrito,this.IdPersona)
    .subscribe( {
      next: () => {

        this.router.navigate(['carrito',this.IdPersona])
      },
      error: () => { this.authService.logout(); }
    });
  }

  // =================================
  cambioIdSabor1(event: any)
  { 
    this.idSaborSeleccionado1 = event.target.value;
    this.dameDisponiblesProducto(1,this.IdProducto1, this.idSaborSeleccionado1);
  }
  // =================================
  cambioIdSabor2(event: any)
  { 
    this.idSaborSeleccionado2 = event.target.value;
    this.dameDisponiblesProducto(2,this.IdProducto2, this.idSaborSeleccionado2);
  }

  // 
  dameDisponiblesProducto(productoNro:any,IdProducto: any,IdSabor: any){
    
    this.productosService.dameStockSaborProducto(IdProducto, IdSabor)
    .subscribe( {
      next: (resp: any) => {

        if(resp[1][0].Mensaje == 'Ok' && resp[0].length > 0)
        {
          if(productoNro == 1)
          {
            this.stockSaborProducto1 = resp[0][0].Stock;
          }
          else
          {
            this.stockSaborProducto2 = resp[0][0].Stock;
          }
        }
        else
        {
          if(productoNro == 1)
          {
            this.stockSaborProducto1 = 0;
          }
          else
          {
            this.stockSaborProducto2 = 0;
          }
        }
      },
      error: () => { this.router.navigate(['/failure']); }
    }
  );
  }

  // ==============================
  dameDisponiblesProducto2(){
    this.productosService.dameDatosPromocion(this.IdPromocion,this.idSaborSeleccionado1,this.idSaborSeleccionado2)
    .subscribe( {
      next: (resp: any) => { 
        if ( resp[1][0].Mensaje == 'Ok') {
          this.stockSaborProducto2 = resp[0].stockDisponible;
        }
        return;
        
      },
      error: () => { this.router.navigate(['/failure']); }
    }
  );
  }

  // =================================================================
  changeCantidad() {
    this.checkoutService.changeCantidadPromocion(this.Cantidad);
  }

  // 
  rutearComprarAhora(){
    if(this.stockSaborProducto1 <= 0 || this.stockSaborProducto2 <= 0)
    {
      this.mensajeStockProducto = true;
      return;
    }

    if(this.cantidad <= 0)
    {
      this.mensajeCantidad = true;
      return;
    }

    this.mensajeStockProducto = false;
    this.router.navigate(['/comprar-ahora/promocion',this.IdPromocion,this.IdPersona]);
  }
}
