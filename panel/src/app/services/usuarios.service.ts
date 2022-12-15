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
    console.log("pasa listar usuarios")

    let url = URL_SERVICIOS + '/usuarios/listarPaginado/' + desde;

    return this.http.get( url );
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

}
