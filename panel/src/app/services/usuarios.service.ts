import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  ocultarSidebar = true;

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
  listarUsuariosPaginado(desde: any){

    let url = URL_SERVICIOS + '/usuarios/listarPaginado/' + desde + '/' + this.IdPersona;

    return this.http.get( url , this.headers);
  }

// ==================================================
//
// ==================================================
buscarUsuariosPaginado(desde: any,pParametroBusqueda: any){

  let url = URL_SERVICIOS + '/usuarios/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}  

  // ==================================================
//        
// ==================================================
altaUsuario( usuario: any ) {

  console.log("usuario es : ",usuario);

  let url = URL_SERVICIOS + '/usuarios/alta/' + this.IdPersona;
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    usuario,
    this.headers
);
}
  // ==================================================
//        apellido,nombre y sucursla en la que se desempaña
// ==================================================
cargarDatosVendedor( IdPersona: any ) {

  let url = URL_SERVICIOS + '/usuarios/' + IdPersona;

  return this.http.get(
    url
);
}
// ==================================================
//        
// ==================================================
bajaUsuario( IdUsuario: any ) {

  let url = URL_SERVICIOS + '/usuarios/baja/' + this.IdPersona + '/' + IdUsuario;

  return this.http.get(url,this.headers);
}

// ==================================================
// 
// ==================================================
cargarDatosFormEditarUsuario( IdUsuario: any){
  
  let url = URL_SERVICIOS + '/usuarios/editar/datos-formulario/' + IdUsuario + '/' + this.IdPersona;
  return this.http.get( url,this.headers );

}

// ==================================================
//        
// ==================================================
editarUsuario( IdUsuario: any,usuarioEditado: any ) {

  let url = URL_SERVICIOS + '/usuarios/editar/' + IdUsuario + '/'+ this.IdPersona;

  return this.http.post(url,usuarioEditado,this.headers);
}
}
