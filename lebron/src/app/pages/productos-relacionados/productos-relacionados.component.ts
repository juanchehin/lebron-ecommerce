import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const URL_IMAGENES = environment.URL_IMAGENES;

@Component({
  selector: 'app-productos-relacionados',
  templateUrl: './productos-relacionados.component.html',
  styleUrls: []
})
export class ProductosRelacionadosComponent implements OnInit {

  desde = 0;
  numbers: any[] = [];
  totalAsistencias = true;
  public imgTemp: any = '../../../assets/img/lebron_lebron.png';

  productosRelacionados!: any;
  productosRelacionadosPaginacion!: any;
  cantPlanes = 0;

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

                console.log("imgtest : ", this.imgTemp);
                console.log("this.productosPromocion : ", this.productosRelacionados);

                this.totalProductosRelacionados = resp[0].length;

                this.productosRelacionadosPaginacion = this.productosRelacionados.slice(0, 6);

              });

  }
// ==================================================
// Carga
// ==================================================

rutearDetalleProducto(IdProducto: any) {

  this.router.navigate(['/producto/detalle',IdProducto]);

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
