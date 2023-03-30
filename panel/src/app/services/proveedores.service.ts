import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

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
listarProveedores(){

  let url = URL_SERVICIOS + '/proveedores/dame/todos/' + this.IdPersona;

  return this.http.get( url,this.headers );
}
// ==================================================
//
// ==================================================
  listarProveedoresPaginado(desde: any){

    let url = URL_SERVICIOS + '/proveedores/listar/' + this.IdPersona + '/' + desde;

    return this.http.get( url, this.headers );
  }

// ==================================================
//
// ==================================================
buscarProveedoresPaginado(desde: any,pParametroBusqueda: any){

  let url = URL_SERVICIOS + '/proveedores/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}  

  // ==================================================
//        
// ==================================================
altaProveedor( proveedor: any ) {

  // console.log("usuario es : ",usuario);

  let url = URL_SERVICIOS + '/proveedores/alta/' + this.IdPersona;
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    proveedor,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
//        
// ==================================================
bajaProveedor( IdProveedor: any ) {

  // console.log("usuario es : ",usuario);

  let url = URL_SERVICIOS + '/proveedores/baja/' + IdProveedor + '/' + this.IdPersona + '/one';

  return this.http.get(
    url,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
// Cargo la data del proveedor
// ==================================================
cargarDatosFormEditarProveedor(IdProveedor: any ){

  let url = URL_SERVICIOS + '/proveedores/editar/datos-formulario/' + IdProveedor + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}

// ==================================================
//        
// ==================================================
editarProveedor( proveedorEditado: any ) {

  let url = URL_SERVICIOS + '/proveedores/editar/' + this.IdPersona;

  return this.http.post(
    url,
    proveedorEditado,
    {
      headers: {
        token: this.token
      }
    }
);
}
}
