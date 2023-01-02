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
  listarMarcasPaginado(desde: any){

    let url = URL_SERVICIOS + '/marcas/listar/' + desde;

    return this.http.get( url );
  }

  // ==================================================
//        
// ==================================================
altaMarca( marca: any ) {

  let url = URL_SERVICIOS + '/marcas/alta/' + this.IdPersona;

  return this.http.post( url, marca,this.headers);
}

}
