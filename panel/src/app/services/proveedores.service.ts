import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarProveedoresPaginado(desde: any){

    let url = URL_SERVICIOS + '/proveedores/listar/' + desde;

    return this.http.get( url );
  }
  // ==================================================
//        
// ==================================================
altaProveedor( proveedor: any ) {

  // console.log("usuario es : ",usuario);

  let url = URL_SERVICIOS + '/proveedores/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    proveedor
    // {
    //   headers: {
    //     token: this.token
    //   }
    // }
);
}


}
