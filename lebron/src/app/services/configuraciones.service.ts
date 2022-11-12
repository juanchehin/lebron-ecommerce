import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarConfiguraciones(){
    console.log("pasa listar listarConfiguraciones")

    let url = URL_SERVICIOS + '/settings/listar/empresa';

    return this.http.get( url );
  }


}
