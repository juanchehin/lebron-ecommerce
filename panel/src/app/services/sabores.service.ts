import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class SaboresService {

  
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
buscarSaboresPaginado(desde: any,pParametroBusqueda: any){

  let url = URL_SERVICIOS + '/sabores/buscar/' + desde + '/' + pParametroBusqueda +  '/' + this.IdPersona;

  return this.http.get( url, this.headers );
  }

  // ==================================================
//        
// ==================================================
altaSabor( sabor: any ) {

  let url = URL_SERVICIOS + '/sabores/alta/' + this.IdPersona;

  return this.http.post( url, sabor,this.headers);
}


// ==================================================
// Cargo la data del sabor
// ==================================================
cargarDatosFormEditarSabor(IdSabor: any ){

  let url = URL_SERVICIOS + '/sabores/editar/datos-formulario/' + IdSabor + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
  // ==================================================
//        
// ==================================================
editarSabor( saborEditado: any ) {

  let url = URL_SERVICIOS + '/sabores/editar/' + this.IdPersona;

  return this.http.post( url, saborEditado, this.headers);
}

  // ==================================================
//        
// ==================================================
bajaSabor( IdSabor: any ) {

  let url = URL_SERVICIOS + '/sabores/baja/' + this.IdPersona + '/' + IdSabor ;

  return this.http.get(url,this.headers);
}
}
