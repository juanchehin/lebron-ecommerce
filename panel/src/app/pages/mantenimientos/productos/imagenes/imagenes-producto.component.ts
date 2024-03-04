import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesService } from '../../../../services/imagenes.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-imagenes-producto',
  templateUrl: './imagenes-producto.component.html',
  styleUrls: ['./imagenes-producto.component.css']
})
export class ImagenesProductoComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  url_imagenes_producto = url_imagenes_producto;

  imagenes!: any;
  cantPlanes = 0;
  imagen_producto: any;
  FinalformData!: FormData;

  totalImagenes = 0;
  cargando = true;

  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  imagenPreview: string | ArrayBuffer | null = null;

  @ViewChild('divCerrarModalAltaImagen') divCerrarModalAltaImagen!: ElementRef<HTMLElement>;

  constructor(
    public imagenesService: ImagenesService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarImagenes();
  }

  //
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagen_producto = event.target.files[0];
      console.log('this.imagen_producto::: ', this.imagen_producto);

      this.FinalformData = new FormData();
      this.FinalformData.append('imagen_producto', this.imagen_producto, this.imagen_producto.name);
    }else{
      this.alertService.alertFail('Ocurrio un error al cargar la imagen ',false,1000);
    }

    const file = event.target.files[0];

    if (file) {
      this.mostrarVistaPrevia(file);
    }
  }

  //
  mostrarVistaPrevia(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenPreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
// ==================================================
// Carga
// ==================================================

cargarImagenes() {

    const id_producto = this.route.snapshot.paramMap.get('IdProducto');

    this.imagenesService.listarImagenesProductoPaginado( this.desde , id_producto  )
               .subscribe({
                next: (resp: any) => {

                  if(resp[2][0].mensaje == 'ok'){
                    this.totalImagenes = resp[1][0].cant_imagenes;
  
                    this.imagenes = resp[0];
                  }else{
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000)

                  }
                 },
                error: () => { 
                  this.alertService.alertFail('Ocurrio un error',false,2000)
                }
              });
  }

  // ==================================================
// Carga
// ==================================================
  alta_imagen(){

    const id_producto = this.route.snapshot.paramMap.get('IdProducto');

    this.imagenesService.altaImagen( this.imagen_producto , id_producto )
    .subscribe({
      next: (resp: any) => {
        
        if ( resp[0][0].mensaje == 'ok') {
          this.alertService.alertSuccess('top-end','Imagen cargada',false,2000);

          let el: HTMLElement = this.divCerrarModalAltaImagen.nativeElement;
          el.click();

          this.cargarImagenes();
          
        } else {
          this.alertService.alertFailWithText('Ocurrio un error','Revise el tamaño y tipo de archivo (png,jpg,jpeg) o contactese con el administrador',false,2000);
        }
        return;
       },
      error: (err: any) => { 
        this.alertService.alertFailWithText('Ocurrio un error','Revise el tamaño y tipo de archivo (png,jpg,jpeg) o contactese con el administrador',false,2000);
       }
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

      this.imagenesService.eliminarImagen( IdImagen  )
      .subscribe({
        next: (resp: any) => {
          if(resp[0][0].mensaje == 'ok'){
            this.alertService.alertSuccess('top-end','Producto eliminado',false,2000);
          this.cargarImagenes();
          }else{
            this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);

          }
         },
        error: () => { 
          this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
        }


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

// ==================================================
// 
// ==================================================

refrescar() {

  this.desde = 0;
  // this.IdSucursal = 1;


  this.cargarImagenes();

}

}
