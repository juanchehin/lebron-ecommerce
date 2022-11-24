import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
cargarClientes( parametroBusqueda: string){

      console.log("pas else ",parametroBusqueda)
      let url = URL_SERVICIOS + '/clientes/listar/busqueda/' + parametroBusqueda;
      return this.http.get( url );
    
    
  }

  

}
