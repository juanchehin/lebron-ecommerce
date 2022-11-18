import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  token: any = null;
  usuario: any;

  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  dameClientes(){

    let url = URL_SERVICIOS + '/jornada/trazabilidad';

    return this.http.get( url );
  }

  // ==================================================
  //        Permite saber si un usuario esta logueado
  // ==================================================
  estaLogueado(): boolean {

    this.token = localStorage.getItem('token');
    if ((this.token === 'undefined') || (this.token === null) || !(this.token.length > 5)) {
      console.log("false esta logueado service")
      return false;
    } else {
      console.log("true esta logueado service")
      return true;

    }
  }

// ==================================================
//        Crear cliente
// ==================================================
altaCliente( cliente: any ) {

  console.log("clinetes es : ",cliente);

  let url = URL_SERVICIOS + '/cliente/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    cliente
);
}

}
