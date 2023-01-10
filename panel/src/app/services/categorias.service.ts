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
listarCategorias(){

  let url = URL_SERVICIOS + '/categorias/listar/' + this.IdPersona;

  return this.http.get( url,this.headers );
}

  // ==================================================
//        
// ==================================================
altaCategoria( categoria: any ) {

  let url = URL_SERVICIOS + '/categorias/alta/' + this.IdPersona;

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
cargarDatosFormEditarCategoria( IdCategoria: any){
  
  let url = URL_SERVICIOS + '/categorias/editar/datos-formulario/' + IdCategoria + '/' + this.IdPersona;
  return this.http.get( url,this.headers );

}

// ==================================================
//        
// ==================================================
editarCategoria( IdCategoria: any,categoriaEditado: any ) {

  let url = URL_SERVICIOS + '/categorias/editar/' + IdCategoria + '/'+ this.IdPersona;

  return this.http.post(url,categoriaEditado,this.headers);
}
// ==================================================
// ==================================================
//        ** Subcategorias **
// ==================================================
// ==================================================


// ==================================================
//        
// ==================================================
altaSubCategoria( SubCategoria: any ) {

let url = URL_SERVICIOS + '/categorias/subcategorias/alta/' + this.IdPersona;

return this.http.post(url,SubCategoria,this.headers);
}
// ==================================================
//
// ==================================================

buscarSubCategoriasPaginado(desde: any,pParametroBusqueda: any){

let url = URL_SERVICIOS + '/categorias/subcategorias/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

return this.http.get( url, this.headers );
}  

// ==================================================
//        
// ==================================================
bajaSubCategoria( IdCategoria: any ) {

let url = URL_SERVICIOS + '/categorias/subcategorias/baja/' + IdCategoria + '/' + this.IdPersona;

return this.http.get( url,this.headers);
}

// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormEditarSubCategoria( IdSubCategoria: any){

  let url = URL_SERVICIOS + '/categorias/subcategorias/editar/datos-formulario/' + IdSubCategoria + '/' + this.IdPersona;
  
  return this.http.get( url,this.headers );

}

// ==================================================
//        
// ==================================================
editarSubCategoria( IdCategoria: any,categoriaEditado: any ) {

let url = URL_SERVICIOS + '/categorias/subcategorias/editar/' + IdCategoria + '/'+ this.IdPersona;

return this.http.post(url,categoriaEditado,this.headers);
}

}
