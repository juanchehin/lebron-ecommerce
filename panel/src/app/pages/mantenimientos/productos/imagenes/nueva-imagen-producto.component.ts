import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-imagen-producto',
  templateUrl: './nueva-imagen-producto.component.html',
  styles: []
})
export class NuevaImagenProductoComponent implements OnInit {

  // forma!: FormGroup;
  cargando = true;
  marcas: any;
  categorias: any;
  codigo: any;
  banderaGenerarCodigo = false;
  IdProducto: any;

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file
  nombreImagen: any;


  constructor(
    private router: Router, 
    public productosService: ProductosService,
    public imagenesService: ImagenesService,
    private route: ActivatedRoute
    ) {
    
  }

  ngOnInit() {
    // this.cargarCategorias();
    // this.cargarMarcas();
    // this.cargarUnidades();
    this.IdProducto = this.route.snapshot.paramMap.get('IdProducto');

    // this.forma = new FormGroup({
    //   NombreImagen: new FormControl(null, Validators.required ),
    //   Imagen: new FormControl(null, Validators.required)
    //   });
  }

// ==================================================
//        Crear 
// ==================================================

altaImagen() {

      // if ( this.forma.invalid ) {
      //   return;
      // }

      // const imagen = new Array(
      //   this.forma.value.NombreImagen,
      //   this.forma.value.Imagen,
      //   this.IdProducto
      // );

      // this.imagenesService.altaImagen( imagen )
      //           .subscribe( (resp: any) => {
      //             console.log("resp en plan es : ",resp)
      //             if ( resp.Mensaje === 'Ok') {
      //               Swal.fire({
      //                 position: 'top-end',
      //                 icon: 'success',
      //                 title: 'Imagen cargada con exito',
      //                 showConfirmButton: false,
      //                 timer: 2000
      //               });
      //               this.router.navigate(['/dashboard/productos/imagnes',this.IdProducto]);
      //             } else {
      //               Swal.fire({
      //                 icon: 'error',
      //                 title: 'Hubo un problema al cargar',
      //                 text: 'Contactese con el administrador',
      //               });
      //             }
      //             return;
      //           });


            }

  // ==================================================
// Carga
// ==================================================

// On file Select
onChange(event: any) {
  this.file = event.target.files[0];
}

nombreImagenChange(event: any) {
  console.log(event.target.value);
  this.nombreImagen = event.target.value;
}

// OnClick of button Upload
onUpload() {
  this.loading = !this.loading;

  console.log(this.file);

  const resp = this.imagenesService
      .subirImagen( this.file,this.nombreImagen,this.IdProducto,'productos')
      .then( img => {
        if(img){
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          // this.router.navigate['/dashboard/productos/imagenes/', this.IdProducto];
        }
        else{
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }

        // this.modalImagenService.nuevaImagen.emit(img);

      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })

    console.log("resp resp : ",resp);

}


}
