import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class MarcasService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarMarcasPaginado(desde: any){
    console.log("pasa listar Marcas")

    let url = URL_SERVICIOS + '/marcas/listar/' + desde;

    return this.http.get( url );
  }


}
