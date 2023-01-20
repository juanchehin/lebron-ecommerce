import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  IdCategoria: any;
  desde = '0';
  categoriaSeleccionada = '';
  url_imagenes_producto = url_imagenes_producto;
  public imgTemp: any = 'lebron_lebron.png';

  numbers: any[] = [];

  productosCategoria!: any;
  cantPlanes = 0;

  totalProductosCategoria = 0;
  cantidadPaginado = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
   }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.cargarProductosCategoria();
  }

// ==================================================
// Carga
// ==================================================

cargarProductosCategoria() {

  this.IdCategoria = this.activatedRoute.snapshot.paramMap.get('IdCategoria');

    this.productosService.listarProductosCategoria( this.IdCategoria,this.desde  )
               .subscribe( (resp: any) => {

                this.productosCategoria = resp[0];

                this.categoriaSeleccionada = resp[1][0].Categoria;

                this.totalProductosCategoria = resp[1][0].cantProductosCategoria;

                if(this.totalProductosCategoria > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalProductosCategoria/12);
                }
                else
                {
                  this.cantidadPaginado = 1;
                }

                this.numbers = Array.from({length: this.cantidadPaginado}, (_, i) => i + 1)

              });

  }

cambiarDesde( valor: number ) {

  // const desde = this.desde + valor;

  // if ( desde >= this.totalUsuarios ) {
  //   return;
  // }

  // if ( desde < 0 ) {
  //   return;
  // }

  // this.desde += valor;
  // this.cargarUsuarios();

}

// ==================================================
// Carga
// ==================================================

rutearDetalleProducto(IdProducto: any) {

  this.router.navigate(['/producto/detalle',IdProducto]);

  }


}
