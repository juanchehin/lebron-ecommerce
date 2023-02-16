import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

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
altaCliente( cliente: any ) {

  let url = URL_SERVICIOS + '/clientes/alta/' + this.IdPersona;

  return this.http.post(url,cliente, this.headers );
}
// ==================================================
//
// ==================================================
cargarClientes( parametroBusqueda: string){

    if(parametroBusqueda == '' || parametroBusqueda == null){
      let url = URL_SERVICIOS + '/clientes/listar/paginado/' + 0;
      return this.http.get( url );
    }
    else
    { 
      let url = URL_SERVICIOS + '/clientes/listar/busqueda/' + parametroBusqueda;
      return this.http.get( url );
    }
    
  }

// ==================================================
//
// ==================================================
buscarClientesPaginado(desde: any,filtroCliente: any, pClienteBuscado: any){

  if(pClienteBuscado == '' || pClienteBuscado == null || pClienteBuscado == 'null' || !pClienteBuscado || pClienteBuscado.length === 0)
  {
    pClienteBuscado = '0';
  }

  let url = URL_SERVICIOS + '/clientes/listar/paginado/' + this.IdPersona + '/' + desde + '/' + pClienteBuscado + '/' + filtroCliente;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
bajaCliente(IdCliente: any ) {

  let url = URL_SERVICIOS + '/clientes/baja/' + IdCliente + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}
  // ==================================================
//        
// ==================================================
editarCliente( clienteEditado: any ) {

  let url = URL_SERVICIOS + '/clientes/editar/' + this.IdPersona;

  return this.http.post( url, clienteEditado,this.headers);
}


// ==================================================
//        
// ==================================================
cargarDatosFormEditarCliente( IdCliente: any ) {

  let url = URL_SERVICIOS + '/clientes/editar/datos-formulario/' + IdCliente + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
}
