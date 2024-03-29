import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token!: any;
  public IdPersona!: any;
  public cantItemsCarrito: any = 0;

  private IdPersonaSource = new BehaviorSubject<string>('');
  public  quoteIdPersona = this.IdPersonaSource.asObservable();  // 

  private cantItemsCarritoSource = new BehaviorSubject<string>('');
  public quoteCantItemsCarrito = this.cantItemsCarritoSource.asObservable();  // 

  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarStorage();
  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================

setIdPersona(IdPersona: any) {
  this.IdPersonaSource.next(IdPersona);
}

setcantItemsCarrito(cantItemsCarrito: any) {
  this.cantItemsCarritoSource.next(cantItemsCarrito);
}
// ==================================================
//        Logueo de un usuario del sistema
// ==================================================
loginCliente( persona: any ): any {

  const url = URL_SERVICIOS + '/login/cliente';

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {

                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

      this.IdPersona = resp.IdPersona;

      this.setIdPersona(resp.IdPersona);  //
      this.setcantItemsCarrito(resp.cantItemsCarrito);  //

      this.guardarStorage( resp.IdPersona, resp.token,resp.cantItemsCarrito );
      this.cargarStorage();

      return true;
    }));


}
// ==================================================
//        Guarda la info en el localstorage
//  Guarda en el storage la informacion recibida por parametros
// ==================================================
guardarStorage( id: string, token: string, cantItemsCarrito: any) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('items-carrito', cantItemsCarrito );

  this.token = token;
  this.IdPersona = id;

  // this.actualizaEstadoCliente(this.personaId);
}

// ==================================================
// Carga la informacion almacenada en el localstorage a la informacion actual para que
// pueda ser accesada desde este servicio
// ==================================================
  cargarStorage() {

    if ((localStorage.getItem('token') === 'undefined') || (localStorage.getItem('token') === null)) {
      this.token = '';
      this.IdPersona = null;
      
    } else {
      const var1 = localStorage.getItem('token');
      this.token = var1;

      const var3 = localStorage.getItem('id');
      this.IdPersona = var3;

      const var4 = localStorage.getItem('items-carrito');
      // this.IdPersona = var3;

    }

  }

// ==================================================
//        Permite saber si un usuario esta logueado
// ==================================================
estaLogueado() {

  this.token = localStorage.getItem('token');

  if ((this.token === 'undefined') || (this.token === null)) {
    return false;
  } else {
    return( this.token.length > 5);

  }
}


// ==================================================
//   Actualiza los datos del usuario (Estado,Clases disponibles,mesesCredito,etc)
// ==================================================
actualizaEstadoCliente( IdPersona: string ) {
  const url = URL_SERVICIOS + '/login/control/estado/' + IdPersona;
  return this.http.get(url);
}
// ==================================================
//        Hace el logout del usuario
// ==================================================

logout() {

  this.token = '';
  this.IdPersona = null;
  // this.IdPersonaSource.complete();
  // this.cantItemsCarritoSource.complete();

  localStorage.setItem('id', '' );
  localStorage.setItem('token', '' );
  localStorage.setItem('items-carrito', '' );

  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('items-carrito');

  this.router.navigate(['/cuenta/login']);
}

// ==================================================
//   
// ==================================================
recuperarClave( pEmail: string ) {
  
  const url = URL_SERVICIOS + '/login/recuperar-clave/' + pEmail;
  return this.http.get(url);
  
}

// ==================================================
//     
// ==================================================
nuevaClave( token: any,Password: any ): any {

  const url = URL_SERVICIOS + '/login/nueva-pass';

  const datos = new Array(
    token,
    Password
  );
  
  return this.http.post( url, datos );

}
}
