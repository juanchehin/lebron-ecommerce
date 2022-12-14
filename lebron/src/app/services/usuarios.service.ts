import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


// ==================================================
//
// ==================================================
  listarUsuariosPaginado(desde: any){
    console.log("pasa listar usuarios")

    let url = URL_SERVICIOS + '/usuarios/listarPaginado/' + desde;

    return this.http.get( url );
  }


}
