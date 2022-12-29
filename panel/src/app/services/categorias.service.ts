import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }
  // ==============================
  get IdPersona(): any {
    if(this.authService.IdPersona)
    {
      return this.authService.IdPersona;
    }
    else
    {
      return localStorage.getItem('id') || '';
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

// ==================================================
//
// ==================================================
  listarCategoriasPaginado(desde: any){

    let url = URL_SERVICIOS + '/categorias/listar/' + desde;

    return this.http.get( url );
  }

  

  // ==================================================
//        
// ==================================================
altaCategoria( categoria: any ) {

  let url = URL_SERVICIOS + '/categorias/alta';

  return this.http.post(url,categoria,this.headers);
}
// ==================================================
//
// ==================================================
cargarCategorias( parametroBusqueda: string){

  if(parametroBusqueda == '' || parametroBusqueda == null){
    let url = URL_SERVICIOS + '/categorias/listar/' + 0;
    return this.http.get( url );
  }
  else
  { 
    let url = URL_SERVICIOS + '/categorias/listar/busqueda/' + parametroBusqueda;
    return this.http.get( url );
  }


}
// ==================================================
//
// ==================================================
cargarSubcategoriaIdCategoria( IdCategoria: string){


    let url = URL_SERVICIOS + '/categorias/listar/subcategorias/' + IdCategoria;
    return this.http.get( url );



}
// ==================================================
//
// ==================================================

buscarCategoriasPaginado(desde: any,pParametroBusqueda: any){

  let url = URL_SERVICIOS + '/categorias/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}  

// ==================================================
//        
// ==================================================
bajaCategoria( IdCategoria: any ) {

  let url = URL_SERVICIOS + '/categorias/baja/' + IdCategoria + '/' + this.IdPersona;

  return this.http.get( url,this.headers);
}

// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormEditarCategoria( ){
  
  let url = URL_SERVICIOS + '/categorias/editar/datos-formulario/' + this.IdPersona;
  return this.http.get( url,this.headers );

}

// ==================================================
//        
// ==================================================
editarCategoria( categoriaEditado: any ) {

  let url = URL_SERVICIOS + '/categorias/editar/' + this.IdPersona;

  return this.http.post(url,categoriaEditado,this.headers);
}
}
