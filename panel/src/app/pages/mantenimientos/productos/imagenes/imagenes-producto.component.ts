import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesService } from '../../../../services/imagenes.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-imagenes-producto',
  templateUrl: './imagenes-producto.component.html',
  styles: []
})
export class ImagenesProductoComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  url_imagenes_producto = url_imagenes_producto;

  imagenes!: any;
  cantPlanes = 0;
  IdProducto: any;

  totalImagenes = 0;
  cargando = true;

  constructor(
    public imagenesService: ImagenesService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarImagenes();
  }

// ==================================================
// Carga
// ==================================================

cargarImagenes() {

    this.IdProducto = this.route.snapshot.paramMap.get('IdProducto');

    this.imagenesService.listarImagenesProductoPaginado( this.desde , this.IdProducto  )
               .subscribe( (resp: any) => {

                this.totalImagenes = resp[1][0].cantImagenes;

                this.imagenes = resp[0];

                this.cargando = false;

              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalImagenes ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarImagenes();

}


publicarProducto(IdProducto: string){
  console.log("pasa publicar producto IdProducto : ",IdProducto)
}


destacarProducto(IdProducto: string){
  console.log("pasa destacarProducto producto IdProducto : ",IdProducto)
}


promocionProducto(IdProducto: string){
  console.log("pasa promocionProducto producto IdProducto : ",IdProducto)
}


ofertaProducto(IdProducto: string){
  console.log("pasa ofertaProducto producto IdProducto : ",IdProducto)
}

}
