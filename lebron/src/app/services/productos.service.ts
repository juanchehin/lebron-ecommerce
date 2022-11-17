import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


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
listarProductosCategoria(IdCategoria: any, desde: string){

  let url = URL_SERVICIOS + '/productos/listar/categoria/' + IdCategoria + '/' + desde;

  return this.http.get( url );
}


// ==================================================
//
// ==================================================
listarProductosPromocionPaginado(desde: any){
  console.log("pasa listar prods promo")

  let url = URL_SERVICIOS + '/productos/listar/promocion/' + desde;

  return this.http.get( url );
}


// ==================================================
//
// ==================================================
buscarProductos(productoBuscado: any, desde: any){

  let url = URL_SERVICIOS + '/productos/buscar/' + productoBuscado + '/' + desde;

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
listarProductosDestacadosHome(){

  let url = URL_SERVICIOS + '/productos/destacados/home';

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
listarProductosPromocionHome(){

  let url = URL_SERVICIOS + '/productos/promocion/home';

  return this.http.get( url );
}


}
