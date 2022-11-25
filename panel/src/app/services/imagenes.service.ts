import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
