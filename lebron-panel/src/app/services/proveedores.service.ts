import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarProveedoresPaginado(desde: any){
    console.log("pasa listar prov")

    let url = URL_SERVICIOS + '/proveedores/listar/' + desde;

    return this.http.get( url );
  }


}
