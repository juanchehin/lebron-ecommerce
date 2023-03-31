import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

    
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
listarUnidadesPaginado(desde: any){

  let url = URL_SERVICIOS + '/productos/unidades/listar/' + desde;

  return this.http.get( url );
}

// ==================================================
//        
// ==================================================
altaUnidad( unidad: any ) {

  let url = URL_SERVICIOS + '/productos/unidades/alta/' + this.IdPersona;

  return this.http.post( url,unidad,this.headers );
}

// ==================================================
//
// ==================================================
  listarTodasUnidades(){
    console.log("pasa listar listarUnidades")

    let url = URL_SERVICIOS + '/productos/unidades/listar';

    return this.http.get( url );
  }

// ==================================================
//        
// ==================================================
editarUnidad( unidadEditado: any ) {

  let url = URL_SERVICIOS + '/productos/unidades/editar/' + this.IdPersona;

  return this.http.post( url, unidadEditado, this.headers);
}

// ==================================================
// Cargo la data del marca
// ==================================================
cargarDatosFormEditarUnidad(IdUnidad: any ){

  let url = URL_SERVICIOS + '/productos/unidades/datos-formulario/' + IdUnidad + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}

// ==================================================
//        
// ==================================================
bajaUnidad( IdUnidad: any ) {

  let url = URL_SERVICIOS + '/productos/unidades/baja/' + IdUnidad + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
}
