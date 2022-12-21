import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-productos-relacionados',
  templateUrl: './productos-relacionados.component.html',
  styleUrls: []
})
export class ProductosRelacionadosComponent implements OnInit {

  desde = 0;
  public imgTemp: any = '../../../assets/img/lebron_lebron.png';

  productosRelacionados!: any;
  productosRelacionadosPaginacion!: any;
  url_imagenes_producto = url_imagenes_producto;
  totalProductosRelacionados = 0;
  cantidadPaginado = 0;
  cargando = true;
  IdProducto: any;

  constructor(
    public productosService: ProductosService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
   }

  ngOnInit() {
    this.cargarProductosRelacionados();
  }

// ==================================================
// Carga
// ==================================================

cargarProductosRelacionados() {

  this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');

    this.productosService.cargarProductosRelacionados( this.IdProducto  )
               .subscribe( (resp: any) => {

                this.productosRelacionados = resp[0];

                this.totalProductosRelacionados = resp[0].length;

                this.productosRelacionadosPaginacion = this.productosRelacionados.slice(0, 6);

              });

  }
// ==================================================
// Carga
// ==================================================

async rutearDetalleProducto(IdProducto: any) {
  
  var url = "/producto/detalle/" + IdProducto;

  await this.router.navigateByUrl('.', { skipLocationChange: true });


  return this.router.navigateByUrl(url);

}

// ==================================================
// Carga
// ==================================================

cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
  
    if ( desde >= this.totalProductosRelacionados ) {
      return;
    }
  
    if ( desde < 0 ) {
      return;
    }
  
    this.desde += valor;

    this.productosRelacionadosPaginacion = this.productosRelacionados.slice(this.desde, this.desde + 6)
    // this.cargarProductos();
  
}
  

}
