import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesService } from '../../../../services/imagenes.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

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
    private route: ActivatedRoute,
    private alertService: AlertService
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

      });

  }

// ==================================================
//      
// ==================================================

eliminarImagen( IdImagen: number ) {

  Swal.fire({
    title: '¿Desea eliminar la imagen?',
    text: "Eliminacion",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {

      console.log("isConfirmed es : ")

      this.imagenesService.eliminarImagen( IdImagen  )
      .subscribe( (resp: any) => {

        console.log("resp prod : ",resp)
        
        if ( resp[1][0].mensaje == 'Ok') {
          this.alertService.alertSuccess('top-end','Producto eliminado',false,2000);
          this.cargarImagenes();
        } else {
          this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
        }
        return;
      });
             
    }
  })

  

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
