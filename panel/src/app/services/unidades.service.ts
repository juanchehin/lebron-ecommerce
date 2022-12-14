import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarTodasUnidades(){
    console.log("pasa listar listarUnidades")

    let url = URL_SERVICIOS + '/productos/unidades/listar';

    return this.http.get( url );
  }


}
