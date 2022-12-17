import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-imagen-producto',
  templateUrl: './nueva-imagen-producto.component.html',
  styles: []
})
export class NuevaImagenProductoComponent implements OnInit {

  cargando = true;
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
    this.IdProducto = this.route.snapshot.paramMap.get('IdProducto');
  }


// 
onChange(event: any) {
  this.file = event.target.files[0];
}
// 
nombreImagenChange(event: any) {
  this.nombreImagen = event.target.value;
}

// ==================================================
// Subida de imagenes
// ==================================================
onUpload() {
  this.loading = !this.loading;

  this.imagenesService
      .subirImagen( this.file,this.nombreImagen,this.IdProducto,'productos')
      .then( (resp: any) => {
        console.log("resp es : ",resp)
        if(resp){
          Swal.fire('Guardado', 'Imagen cargada', 'success');
          this.router.navigate(['dashboard/productos/imagenes/', this.IdProducto]);
        }
        else{
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }

      }).catch( err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })

}


}
