import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  usuario: any;

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

  return this.http.post(
    url,
    cliente
);
}

// ==================================================
//        
// ==================================================
editarCliente( clienteEditado: any ) {

  let url = URL_SERVICIOS + '/clientes/front/editar/' + this.IdPersona;

  return this.http.post( url, clienteEditado,this.headers);
}
// ==================================================
//        
// ==================================================
nuevaDireccion( direccion: any ) {

  let url = URL_SERVICIOS + '/clientes/direccion/alta';

  return this.http.post(
    url,
    direccion
);
}
// ==================================================
//        
// ==================================================
agregarItemCarrito( datosCarrito : any , IdPersona: any) {

  let url = URL_SERVICIOS + '/clientes/carrito/alta/' + IdPersona;

  return this.http.post(
    url,
    datosCarrito,
    this.headers
);
}


// ==================================================
// Busca una persona en la BD
// ==================================================

dameDatosCliente(  ): any {

  const url = URL_SERVICIOS + '/clientes/' + this.IdPersona;

  return this.http.get(url,this.headers);

}

// ==================================================
// Lista las direcciones de un cliente
// ==================================================

dameDirecionesCliente(  ): any {

  const url = URL_SERVICIOS + '/clientes/direcciones/' + this.IdPersona;

  return this.http.get( url, this.headers );

}

// ==================================================
//        Crear cliente
// ==================================================
altaItemCarrito( IdProducto: any,IdPersona: any) {

  const data = Array(
    IdProducto,
    IdPersona
  )

  let url = URL_SERVICIOS + '/clientes/carrito/alta';

  return this.http.post(
    url,
    data
);
}

// ==================================================
// Lista las direcciones de un cliente
// ==================================================

listarCarritoCliente(  ): any {

  const url = URL_SERVICIOS + '/clientes/carrito/' + this.IdPersona;

  return this.http.get( url, this.headers );

}


// ==================================================
// Lista 
// ==================================================

listarComprasCliente(  ): any {

  const url = URL_SERVICIOS + '/clientes/mis-compras/' + this.IdPersona;

  return this.http.get( url, this.headers );

}
// ==================================================
// Lista las direcciones de un cliente
// ==================================================
cardarDatosEnvio(  IdPersona: string  ): any {

  const url = URL_SERVICIOS + '/clientes/datos-envio/' + IdPersona;

  return this.http.get(url);

}

// ==================================================
// 
// ==================================================
eliminarItemCarrito(  IdProducto: any  ): any {

  const url = URL_SERVICIOS + '/clientes/carrito/baja/' + this.IdPersona + '/' + IdProducto;

  return this.http.get(url,this.headers);

}
}
