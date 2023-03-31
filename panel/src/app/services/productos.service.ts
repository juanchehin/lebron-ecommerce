import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

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
  listarProductosPaginado(desde: any,IdSucursal: any,pParametroBusqueda: any){

    let url = URL_SERVICIOS + '/productos/buscar/' + desde + '/' + pParametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

  // ==================================================
//        
// ==================================================
altaProducto( producto: any ) {

  let url = URL_SERVICIOS + '/productos/alta/' + this.IdPersona;

  return this.http.post( url, producto, this.headers);
}
  // ==================================================
//        
// ==================================================
destacarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/productos/destacar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
ofertarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/productos/ofertar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
publicarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/productos/publicar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
editarProducto( productoEditado: any ) {

  let url = URL_SERVICIOS + '/productos/editar/' + this.IdPersona;

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
bajaProducto( IdProductoSabor: any ) {

  let url = URL_SERVICIOS + '/productos/baja/' + IdProductoSabor + '/' + this.IdPersona;

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
cargarProductos( parametroBusqueda: string, IdSucursal: any){

    let url = URL_SERVICIOS + '/productos/listar/busqueda/autocomplete/' + parametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;
    return this.http.get( url, this.headers ); 
    
}
// ==================================================
//
// ==================================================
cargarProductosTranferencia( parametroBusqueda: string, IdSucursalOrigen: any){

  let url = URL_SERVICIOS + '/productos/listar/busqueda/autocomplete/transferencia/' + parametroBusqueda + '/' + IdSucursalOrigen;
  return this.http.get( url, this.headers ); 
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormNuevoProducto( ){
  
    let url = URL_SERVICIOS + '/productos/nuevo/datos-formulario';
    return this.http.get( url , this.headers);
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal y el producto
// ==================================================
cargarDatosFormEditarProducto(IdProducto: any ){
  
  let url = URL_SERVICIOS + '/productos/editar/datos-formulario/' + IdProducto + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
// ==================================================
// Busca 
// ==================================================

buscarProductos( producto: string , pDesde: any ): any {

  if(producto == '' || producto == null){
    let url = URL_SERVICIOS + '/productos/listar/' + 0;
    return this.http.get(url, this.headers);
  }
  else
  { 
    const url = URL_SERVICIOS + '/productos/buscar/' + producto + '/' + pDesde;
    return this.http.get(url, this.headers);
  } 

}

// ==================================================
//  ******* Promociones *******        
// ==================================================
// ==================================================
//
// ==================================================
listarPromocionesPaginado(desde: any){

  let url = URL_SERVICIOS + '/productos/promociones/listar/' + desde;

  return this.http.get( url );
}

  // ==================================================
//        
// ==================================================
altaPromocion( promocion: any ) {

  let url = URL_SERVICIOS + '/productos/promocion/alta/'+ this.IdPersona;

  return this.http.post( url, promocion, this.headers);
}


  // ==================================================
//        
// ==================================================
editarPromocion( promocion: any ) {

  let url = URL_SERVICIOS + '/productos/promocion/update';
  // url += '?IdRol=' + this.IdRol;

  return this.http.put(
    url,
    promocion
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
publicarPromocion( IdPromocion: any ) {

  let url = URL_SERVICIOS + '/productos/promocion/publicar/' + IdPromocion + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}

  // ==================================================
//        
// ==================================================
bajaPromocion( IdPromocion: any ) {

  let url = URL_SERVICIOS + '/productos/promocion/baja/' + IdPromocion + '/' + this.IdPersona;

  return this.http.get(url,this.headers);

}
// ==================================================
//  ******* Transferencias *******        
// ==================================================

// ==================================================
//
// ==================================================
listarTransferenciasPaginado(desde: any,fecha: any){

  let url = URL_SERVICIOS + '/productos/transferencias/listar/' + desde + '/' + fecha + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}  
  // ==================================================
//        
// ==================================================
altaTransferencia( transferencia: any ) {

  let url = URL_SERVICIOS + '/productos/transferencias/alta/' + this.IdPersona;

  return this.http.post(
    url,
    transferencia,
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
bajaTransferencia( IdTransferencia: any ) {

  let url = URL_SERVICIOS + '/productos/transferencias/baja/' + IdTransferencia + '/' + this.IdPersona;

  return this.http.get(
    url,
    {
      headers: {
        token: this.token
      }
    }
);
}
}
