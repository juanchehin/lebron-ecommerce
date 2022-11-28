import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  desde = 0;
  numbers: any[] = [];
  totalAsistencias = true;
  ClasesDisponibles = 0;
  url_imagenes_producto = url_imagenes_producto;
  productosBuscados!: any;
  cantPlanes = 0;
  productosBuscadoParametro: any;
  public imgTemp: any = '../../../assets/img/lebron_lebron.png';
  totalProductosBuscados = 0;
  cantidadPaginado = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarProductosBuscados();
  }

// ==================================================
// Carga
// ==================================================

cargarProductosBuscados() {

  this.productosBuscadoParametro = this.activatedRoute.snapshot.paramMap.get('productoBuscado');

    this.productosService.buscarProductos( this.productosBuscadoParametro, this.desde  )
               .subscribe( (resp: any) => {

                this.productosBuscados = resp[0];

                this.totalProductosBuscados = resp[1][0].cantProductosBuscados;

                if(this.totalProductosBuscados > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalProductosBuscados/12);
                }
                else
                {
                  this.cantidadPaginado = 1;
                }

                this.numbers = Array.from({length: this.cantidadPaginado}, (_, i) => i + 1)


              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

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




}
