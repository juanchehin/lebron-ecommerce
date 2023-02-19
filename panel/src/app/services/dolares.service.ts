import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class DolaresService {

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
listarHistoricoDolares(filtroTipo: number, desde: number , FechaInicio: any , FechaFin: any){

  let url = URL_SERVICIOS + '/dolares/listar/' + this.IdPersona + '/' +  filtroTipo + '/' + desde + '/' + FechaInicio + '/' + FechaFin;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
altaCompraDolares( cliente: any ) {

  let url = URL_SERVICIOS + '/dolares/alta/compra/' + this.IdPersona;

  return this.http.post(url,cliente, this.headers );
}

// ==================================================
//        
// ==================================================
altaVentaDolares( datosVentaDolar: any ) {

  let url = URL_SERVICIOS + '/dolares/alta/venta/' + this.IdPersona;

  return this.http.post( url, datosVentaDolar,this.headers);
}

}
