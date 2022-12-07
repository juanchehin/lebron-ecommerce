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


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

// ==================================================
//
// ==================================================
  listarVentasFecha(desde: number , FechaInicio: string , FechaFin: string){

    let url = URL_SERVICIOS + '/ventas/listar/' + desde + '/' + FechaInicio + '/' + FechaFin;

    return this.http.get( url );
  }

// ==================================================
//
// ==================================================
altaVenta( venta : any){

  // venta.push(this.IdPersona);

  let url = URL_SERVICIOS + '/ventas/alta/' + this.IdPersona;  // < -- chechear en back que sea mismo usuario

  return this.http.post( url, venta );
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

}
