import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class VentasService {

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

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  // ==============================
  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

// ==================================================
//
// ==================================================
  listarVentasFecha(desde: number , FechaInicio: any , FechaFin: any){

    let url = URL_SERVICIOS + '/ventas/listar/' + desde + '/' + FechaInicio + '/' + FechaFin;

    return this.http.get( url, this.headers );
  }

// ==================================================
//
// ==================================================
altaVenta( venta : any){

  let url = URL_SERVICIOS + '/ventas/alta/' + this.IdPersona;

  return this.http.post( url, venta,this.headers );
}

// ==================================================
//
// ==================================================
listarVentasIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/ventas/listar/mis-ventas/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
cargarTiposPago(){

  let url = URL_SERVICIOS + '/ventas/listar/tipos-pago';

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
dameDatosPDFVenta( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/ventas/datos-pdf/' + pIdTransaccion;

  return this.http.get( url ,this.headers);
}


// ==================================================
//
// ==================================================
datosDashboard( ){

  let url = URL_SERVICIOS + '/ventas/datos/dashboard/' + this.IdPersona;

  return this.http.get( url ,this.headers);
}
}
