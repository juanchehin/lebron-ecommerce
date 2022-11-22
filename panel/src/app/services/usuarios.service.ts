import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  ocultarSidebar = true;

  constructor(private http: HttpClient) { }

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

  let url = URL_SERVICIOS + '/usuarios/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    usuario
    // {
    //   headers: {
    //     token: this.token
    //   }
    // }
);
}

}
