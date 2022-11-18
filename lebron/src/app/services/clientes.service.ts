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
      return false;
    } else {
      return true;

    }
  }

// ==================================================
//        Crear cliente
// ==================================================
altaCliente( cliente: any ) {

  console.log("altaCliente es : ",cliente);

  let url = URL_SERVICIOS + '/clientes/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    cliente
);
}

// ==================================================
// Busca una persona en la BD
// ==================================================

dameDatosCliente(  IdPersona: string  ): any {

  const url = URL_SERVICIOS + '/clientes/' + IdPersona;

  return this.http.get(url);

}

}
