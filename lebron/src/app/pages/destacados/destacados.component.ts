import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const url_imagenes_producto = environment.ruta_img_productos;



@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styles: []
})
export class DestacadosComponent implements OnInit {

  public imgTemp: any = '../../../assets/img/lebron_lebron.png';

  productosDestacados!: any;
  url_imagenes_producto = url_imagenes_producto;

  usuarios!: any;
  totalProductosDestacados = 0;
  IdPersona: any;

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    public clientesService: ClientesService,
    public authService: AuthService,
    public router: Router
  ) {
   }

  ngOnInit() {
    this.cargarProductosDestacadosHome();
    this.IdPersona = this.authService.IdPersona;
  }

// ==================================================
// Carga
// ==================================================

cargarProductosDestacadosHome() {

  this.productosService.listarProductosDestacadosHome(  )
  .subscribe( (resp: any) => {

    console.log("resp es : ",resp)

   this.productosDestacados = resp[0];

 });

  }

// ==================================================
// Carga
// ==================================================

  agregarItemCarrito(IdProducto: any){

    this.clientesService.altaItemCarrito( IdProducto,this.IdPersona )
      .subscribe( (resp: any) => {

        // this.productosDestacados = resp[0];

        if(resp[0].Mensaje == 'Ok'){
          this.router.navigate(['/carrito/producto-agregado',IdProducto]);
        }
        else
        { 
          // Mostrar cartel de error al agregar producto al carrito
        }
    });
  }

// ==================================================
// Carga
// ==================================================

rutearDetalleProducto(IdProducto: any) {

  this.router.navigate(['/producto/detalle',IdProducto]);

  }

}
