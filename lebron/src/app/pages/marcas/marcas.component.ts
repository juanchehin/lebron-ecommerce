import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: []
})
export class MarcasComponent implements OnInit {

  IdMarca: any;
  desde = '0';
  marcaSeleccionada = '';
  url_imagenes_producto = url_imagenes_producto;
  public imgTemp: any = 'lebron_lebron.png';

  numbers: any[] = [];

  productosMarca!: any;
  cantPlanes = 0;

  totalProductosMarca = 0;
  cantidadPaginado = 0;
  cargando = true;

  constructor(
    public marcasService: MarcasService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
   }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.cargarProductosMarca();
  }

// ==================================================
// Carga
// ==================================================

cargarProductosMarca() {

  this.IdMarca = this.activatedRoute.snapshot.paramMap.get('IdMarca');

    this.marcasService.listarProductosMarca( this.IdMarca,this.desde  )
               .subscribe( (resp: any) => {

                console.log("res ",resp)

                this.productosMarca = resp[0];

                this.marcaSeleccionada = resp[1][0].Marca;

                this.totalProductosMarca = resp[1][0].cantProductosMarca;

                if(this.totalProductosMarca > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalProductosMarca/12);
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
