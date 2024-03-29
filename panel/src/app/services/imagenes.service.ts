import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }
  // ==============================
  get IdPersona(): any {
    if(this.authService.IdPersona)
    {
      return this.authService.IdPersona;
    }
    else
    {
      return localStorage.getItem('id') || '';
    }
  }


  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

// ==================================================
//
// ==================================================
listarImagenesProductoPaginado( desde: any, IdProducto: any){

  let url = URL_SERVICIOS + '/uploads/imagenes/producto/listar/' + desde + '/' + IdProducto;

  return this.http.get( url );
    
  }
// ==================================================
//
// ==================================================
eliminarImagen( IdImagen: any){

  let url = URL_SERVICIOS + '/uploads/imagenes/producto/eliminar/' + this.IdPersona + '/' + IdImagen;

  return this.http.get(url, this.headers);
    
  }
// ==================================================
//
// ==================================================
altaImagen( imagen_producto: any,id_producto: any){

  const formData_imagen = new FormData();

  // Agregar datos del cliente al formulario
  formData_imagen.append('imagen_producto', imagen_producto);
  formData_imagen.append('id_producto', id_producto);

  let url = URL_SERVICIOS + '/uploads/imagenes/producto/alta/' + this.IdPersona;

  return this.http.post( url, formData_imagen,this.headers );

  }
// ==================================================
//
// ==================================================
async subirImagen(archivo: any,NombreImagen: any,IdProducto: any, tipo: any) {

    let url = URL_SERVICIOS + '/uploads/imagenes/producto/alta/' + NombreImagen + '/' + IdProducto + '/' + tipo;
  
    try {

      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          token: this.token
        },
        body: formData
      });


      const data = await resp.json();

      if ( resp.ok ) {
        
        return true;
      } else {
        
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }


}

}
