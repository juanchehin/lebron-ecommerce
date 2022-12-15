import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarTodasSucursales(){

    let url = URL_SERVICIOS + '/sucursales/listar';

    return this.http.get( url );
  }


}
