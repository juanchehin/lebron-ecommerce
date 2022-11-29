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
  listarCategoriasPaginado(desde: any){

    let url = URL_SERVICIOS + '/productos/listar/' + desde;

    return this.http.get( url );
  }

  

  // ==================================================
//        
// ==================================================
altaCategoria( producto: any ) {

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
cargarCategorias( parametroBusqueda: string){

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

cargarSubcategoriaIdCategoria( IdCategoria: string){


    let url = URL_SERVICIOS + '/categorias/listar/subcategorias/' + IdCategoria;
    return this.http.get( url );



}

}
