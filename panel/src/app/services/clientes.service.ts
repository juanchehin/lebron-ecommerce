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

    if(parametroBusqueda == '' || parametroBusqueda == null){
      console.log("pas if")
      let url = URL_SERVICIOS + '/clientes/listar/paginado/' + 0;
      console.log("url " ,url)
      return this.http.get( url );
    }
    else
    { 
      console.log("pas else")
      let url = URL_SERVICIOS + '/clientes/listar/busqueda/' + parametroBusqueda;
      return this.http.get( url );
    }
    
  }

  

}
