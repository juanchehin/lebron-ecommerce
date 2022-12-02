import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UsuariosService } from './usuarios.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  // token: any = null;
  usuario: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

    get token(): string {
      return localStorage.getItem('token') || '';
    }
  
    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

// ==================================================
//
// ==================================================
buscarProvinciaLocalidades(cp: any){

    let url = URL_SERVICIOS + '/direcciones/buscar/' + cp;

    return this.http.get( url );
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

  console.log("dameDatosCliente es : ")

  const url = URL_SERVICIOS + '/clientes/' + IdPersona;

  return this.http.get(url);

}

// ==================================================
//        Crear cliente
// ==================================================
altaItemCarrito( IdProducto: any,IdPersona: any) {

  // console.log("altaCliente es : ",cliente);

  const data = Array(
    IdProducto,
    IdPersona
  )

  let url = URL_SERVICIOS + '/clientes/carrito/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    data
);
}
// ==============================
cardarDatosEnvio(  IdPersona: string  ): any {

  const url = URL_SERVICIOS + '/clientes/datos-envio/' + IdPersona;

  return this.http.get(url);

}

}
