import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class QuimicosService {

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
  listarQuimicosPaginado(desde: any,pParametroBusqueda: any){

    console.log("listarQuimicosPaginado : ",desde + pParametroBusqueda)

    let url = URL_SERVICIOS + '/quimicos/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

  // ==================================================
//        
// ==================================================
altaQuimico( producto: any ) {

  let url = URL_SERVICIOS + '/quimicos/alta/' + this.IdPersona;

  return this.http.post( url, producto, this.headers);
}
  // ==================================================
//        
// ==================================================
editarProducto( productoEditado: any ) {

  let url = URL_SERVICIOS + '/quimicos/editar/' + this.IdPersona;

  return this.http.post(
    url,
    productoEditado,
    {
      headers: {
        token: this.token
      }
    }
);
}
  // ==================================================
//        
// ==================================================
bajaQuimico( IdProductoSabor: any ) {

  let url = URL_SERVICIOS + '/quimicos/baja/' + IdProductoSabor + '/' + this.IdPersona;

  return this.http.get(
    url,
    {
      headers: {
        token: this.token
      }
    }
);
}
// ==================================================
//  Carga los productos en el autocomplete, que coincidan con el parametroBusqueda
// ==================================================
cargarQuimicos( parametroBusqueda: string, IdSucursal: any){

    let url = URL_SERVICIOS + '/quimicos/listar/busqueda/autocomplete/' + parametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;
    return this.http.get( url, this.headers ); 
    
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormNuevoQuimico( ){
  
    let url = URL_SERVICIOS + '/quimicos/nuevo/datos-formulario';
    return this.http.get( url , this.headers);
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal y el producto
// ==================================================
cargarDatosFormEditarQuimico(IdProducto: any ){
  
  let url = URL_SERVICIOS + '/quimicos/editar/datos-formulario/' + IdProducto + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
// ==================================================
// Busca 
// ==================================================

buscarQuimicos( producto: string , pDesde: any ): any {

  if(producto == '' || producto == null){
    let url = URL_SERVICIOS + '/quimicos/listar/' + 0;
    return this.http.get(url, this.headers);
  }
  else
  { 
    const url = URL_SERVICIOS + '/quimicos/buscar/' + producto + '/' + pDesde;
    return this.http.get(url, this.headers);
  } 

}

}
