import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

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
altaCuenta( cliente: any ) {

  let url = URL_SERVICIOS + '/cuentas/alta/' + this.IdPersona;

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
buscarClientesCuentasPaginado(desde: any, pClienteBuscado: any){

  if(pClienteBuscado == '' || pClienteBuscado == null || pClienteBuscado == 'null' || !pClienteBuscado || pClienteBuscado.length === 0)
  {
    pClienteBuscado = '0';
  }

  let url = URL_SERVICIOS + '/cuentas/listar/paginado/' + this.IdPersona + '/' + desde + '/' + pClienteBuscado;

  return this.http.get( url, this.headers );
}
// ==================================================
//
// ==================================================
cargarMovimientosClienteCuenta(desde: any,IdCliente: any){

  let url = URL_SERVICIOS + '/cuentas/movimientos/listar/paginado/' + this.IdPersona + '/' + desde + '/' + IdCliente;

  return this.http.get( url, this.headers );
}
// ==================================================
//        
// ==================================================
bajaCuentaCliente(IdCliente: any ) {

  let url = URL_SERVICIOS + '/clientes/baja/' + IdCliente + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}
  // ==================================================
//        
// ==================================================
editarCuentaCliente( clienteEditado: any ) {

  let url = URL_SERVICIOS + '/clientes/editar/' + this.IdPersona;

  return this.http.post( url, clienteEditado,this.headers);
}


// ==================================================
//        
// ==================================================
cargarDatosFormEditarCuentaCliente( IdCliente: any ) {

  let url = URL_SERVICIOS + '/clientes/editar/datos-formulario/' + IdCliente + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}

// ==================================================
//        
// ==================================================
altaAcreditarCliente( monto: any,IdCliente: any, descripcion: any) {

  let url = URL_SERVICIOS + '/cuentas/acreditar/alta/' + this.IdPersona;

  var datosCuenta = new Array({
    IdCliente,
    monto,
    descripcion
  })

  return this.http.post(url,datosCuenta, this.headers );

}
}
