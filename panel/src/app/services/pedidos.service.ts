import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {


  constructor(private http: HttpClient) { }

// ==================================================
//
// ==================================================
  listarProductosPaginado(desde: any){
    console.log("pasa listar prods")

    let url = URL_SERVICIOS + '/productos/listar/' + desde;

    return this.http.get( url );
  }

  

  // ==================================================
//        
// ==================================================
altaProducto( producto: any ) {

  let url = URL_SERVICIOS + '/productos/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    producto
    // {
    //   headers: {
    //     token: this.token
    //   }
    // }
);
}
// ==================================================
//
// ==================================================
cargarProductos( parametroBusqueda: string){

  if(parametroBusqueda == '' || parametroBusqueda == null){
    let url = URL_SERVICIOS + '/productos/listar/' + 0;
    return this.http.get( url );
  }
  else
  { 
    let url = URL_SERVICIOS + '/productos/listar/busqueda/' + parametroBusqueda;
    return this.http.get( url );
  }


}

// ==================================================
//  ******* Unidades *******        
// ==================================================

// ==================================================
//
// ==================================================
listarUnidadesPaginado(desde: any){

  let url = URL_SERVICIOS + '/productos/unidades/listar/' + desde;

  return this.http.get( url );
}

  // ==================================================
//        
// ==================================================
altaUnidad( unidad: any ) {

  let url = URL_SERVICIOS + '/productos/unidades/alta';
  // url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    unidad
    // {
    //   headers: {
    //     token: this.token
    //   }
    // }
);
}



}