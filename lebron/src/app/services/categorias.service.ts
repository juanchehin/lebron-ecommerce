import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarProductosPaginado(desde: any){

    let url = URL_SERVICIOS + '/productos/listarPaginado/' + desde;

    return this.http.get( url );
  }

// ==================================================
//
// ==================================================
listarProductosDestacados(desde: any){
  console.log("pasa listar prods")

  let url = URL_SERVICIOS + '/productos/listar/destacados/' + desde;

  return this.http.get( url );
}


// ==================================================
//
// ==================================================
listarCategoriasSubcategorias(){

  let url = URL_SERVICIOS + '/categorias/listar/subcategorias';

  return this.http.get( url );
}

}
