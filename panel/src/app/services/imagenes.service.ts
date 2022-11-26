import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {


  constructor(private http: HttpClient) { }

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
altaImagen( imagen: any){

  let url = URL_SERVICIOS + '/uploads/imagenes/producto/alta';

  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    imagen,
    // {
    //   headers: {
    //     token: this.token
    //   }
    // }
);
    
  }
// ==================================================
//
// ==================================================
async subirImagen(archivo: any,NombreImagen: any,IdProducto: any, tipo: any) {

    let url = URL_SERVICIOS + '/uploads/imagenes/producto/alta/' + NombreImagen + '/' + IdProducto + '/' + tipo;
  
    try {

      const formData = new FormData();
      formData.append('imagen', archivo);

      console.log("formData : ", formData);

      const resp = await fetch( url, {
        method: 'PUT',
        // headers: {
        //   token: this.personaService.token
        // },
        body: formData
      });

      console.log("resp.ok es : ",resp.ok);

      const data = await resp.json();

      if ( resp.ok ) {
        
        return data.nombreArchivo;
      } else {
        
        console.log(data.msg);
        // return false;
      }

    } catch (error) {
      console.log(error);
      // return false;
    }

    return null;


}

}
