import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class VentasService {


  constructor(private http: HttpClient) { }

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

  let url = URL_SERVICIOS + '/ventas/alta/';

  return this.http.post( url, venta );
}
}
