import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  
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
buscarMarcasPaginado(desde: any,pParametroBusqueda: any){

  let url = URL_SERVICIOS + '/marcas/buscar/' + desde + '/' + pParametroBusqueda +  '/' + this.IdPersona;

  return this.http.get( url, this.headers );
  }

  // ==================================================
//        
// ==================================================
altaMarca( marca: any ) {

  let url = URL_SERVICIOS + '/marcas/alta/' + this.IdPersona;

  return this.http.post( url, marca,this.headers);
}


// ==================================================
// Cargo la data del marca
// ==================================================
cargarDatosFormEditarMarca(IdMarca: any ){

  let url = URL_SERVICIOS + '/marcas/editar/datos-formulario/' + IdMarca + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
  // ==================================================
//        
// ==================================================
editarMarca( marcaEditado: any ) {

  let url = URL_SERVICIOS + '/marcas/editar/' + this.IdPersona;

  return this.http.post( url, marcaEditado, this.headers);
}

  // ==================================================
//        
// ==================================================
bajaMarca( IdMarca: any ) {

  let url = URL_SERVICIOS + '/marcas/baja/' + IdMarca + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
}
