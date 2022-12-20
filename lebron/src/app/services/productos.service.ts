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
listarPromociones(desde: any){

  let url = URL_SERVICIOS + '/productos/promociones/listar/' + desde;

  return this.http.get( url );
}


// ==================================================
//
// ==================================================
buscarProductos(productoBuscado: any, desde: any){

  let url = URL_SERVICIOS + '/productos/front/buscar/' + desde + '/' + productoBuscado;

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
cargarPromocionHome(){

  let url = URL_SERVICIOS + '/productos/promocion/home';

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
dameDatosProducto(IdProducto: any,IdSabor: any){

  let url = URL_SERVICIOS + '/productos/producto/detalle/' + IdProducto + '/' + IdSabor;

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
cargarProductosRelacionados(IdProducto: any){

  let url = URL_SERVICIOS + '/productos/relacionados/' + IdProducto;

  return this.http.get( url );
}


// ==================================================
//
// ==================================================
dameDatosPromocion(IdPromocion: any,IdSabor1: any,IdSabor2: any){

  let url = URL_SERVICIOS + '/productos/promocion/detalle/' + IdPromocion + '/' + IdSabor1 + '/' + IdSabor2;

  return this.http.get( url );
}

}
