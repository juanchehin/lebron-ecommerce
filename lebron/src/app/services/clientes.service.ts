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
// Lista las direcciones de un cliente
// ==================================================

dameDirecionesCliente(  IdPersona: string  ): any {

  const url = URL_SERVICIOS + '/clientes/direcciones/' + IdPersona;

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

cardarDatosEnvio(  IdPersona: string  ): any {

  const url = URL_SERVICIOS + '/clientes/datos-envio/' + IdPersona;

  return this.http.get(url);

}

}
