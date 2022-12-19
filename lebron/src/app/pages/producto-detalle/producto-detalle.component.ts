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
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  desde = 0;

  cargando = true;
  IdProducto: any;
  IdPersona: any;
  url_imagenes_producto = url_imagenes_producto;
  public imgTemp: any = '../../../assets/img/lebron_lebron.png';
  Producto: any;
  Marca: any;
  Codigo: any;
  Stock: any;
  Imagen: any;
  Descripcion: any;
  Peso: any;
  Sabor: any;
  PrecioVenta: any;
  Categoria: any;
  SubCategoria: any;
  StockSabor: any;
  Unidad: any;
  Cantidad: any = 1;  // *** CHEQUEAR EL STOCK DE ESTO ANTES DE PONER EN HTML
  sabores: any;
  idSaborSeleccionado = 0;
  

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
    this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');

    this.changeCantidad();
    this.cargarDatosProducto();    
    
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
  changeCantidad() {
    this.checkoutService.changeCantidad(this.Cantidad);
  }
  

  // =================================
  // Carga el costo del envio y la direccion del usuario 
  // seleccionada por defecto por el
// =================================

cargarDatosProducto(){

  this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');

    this.productosService.dameDatosProducto(this.IdProducto, this.idSaborSeleccionado)
    .subscribe( {

      next: (resp: any) => { 
  
        console.log("resp prod : ",resp)
      
        if ( resp[2][0].Mensaje === 'Ok') {

          this.Producto = resp[0][0].Producto;
          this.Categoria = resp[0][0].Categoria;
          this.SubCategoria = resp[0][0].SubCategoria;
          this.Marca = resp[0][0].Marca;
          this.Codigo = resp[0][0].Codigo;
          this.Stock = resp[0][0].Stock;
          this.Imagen = resp[0][0].Imagen;
          this.Descripcion = resp[0][0].Descripcion;
          this.Peso = resp[0][0].Peso;
          this.Sabor = resp[0][0].Sabor;
          this.Unidad = resp[0][0].NombreCorto;
          this.PrecioVenta = resp[0][0].PrecioVenta;
          this.StockSabor = resp[0][0].StockSabor;
    
          this.sabores = resp[1][0].Sabores;

        } else {
          this.router.navigate(['/failure']);
        }
        return;
       },
      error: () => { this.router.navigate(['/failure']); }
    });

     
  }

  // =================================
  cambioCantidad(event: any)
  { 
    console.log(event.target.value);
    this.Cantidad = event.target.value;
    this.changeCantidad();
  }

  // =================================
  agregarCarrito()
  { 
    
    const datosCarrito = new Array(
      this.IdProducto,
      this.IdPersona,
      this.Cantidad
    )

    console.log("datos darrito es ",datosCarrito)

    this.clientesService.agregarItemCarrito(datosCarrito,this.IdPersona)
    .subscribe( (resp: any) => {

        console.log("resp es : ",resp)

        // redireccionar a la pagina de carrito
        this.router.navigate(['carrito',this.IdPersona])

        // actualizar el localstorage

    });
  }
}
