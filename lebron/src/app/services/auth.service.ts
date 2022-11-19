import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  persona!: any;
  personaValor!: any;
  personaId!: any;
  IdRol: any;
  token!: any;
  usuario: any;
  IdPersona!: any;
  // menuBack!: Array[] = [];
  menuBack: any[] = Array();


  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarStorage();
  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================

// ==================================================
//        Logueo de un usuario del sistema
// ==================================================
loginUsuario( persona: any ): any {

  const url = URL_SERVICIOS + '/login/usuario';

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

                console.log("resp en sevicio es ; ",resp)
      this.IdRol = resp.IdRol;
      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu, resp.IdRol);
      this.cargarStorage();

      return true;
    }));


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

                console.log("resp en sevicio es ; ",resp)
      this.IdRol = resp.IdRol;
      this.IdPersona = resp.IdPersona;
      this.guardarStorage( resp.id, resp.token, resp.usuario, [] , '2');
      this.cargarStorage();

      return true;
    }));


}
// ==================================================
//        Guarda la info en el localstorage
//  Guarda en el storage la informacion recibida por parametros
// ==================================================
guardarStorage( id: string, token: string, usuario: any, menu: any[], IdRol: any ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('menu', JSON.stringify(menu) );
  localStorage.setItem('usuario', usuario );

  this.IdRol = IdRol;
  this.token = token;
  this.personaId = id;
  this.usuario = usuario;
  this.menuBack = menu;

  // this.actualizaEstadoCliente(this.personaId);
}

// ==================================================
// Carga la informacion almacenada en el localstorage a la informacion actual para que
// pueda ser accesada desde este servicio
// ==================================================
  cargarStorage() {

    if ((localStorage.getItem('token') === 'undefined') || (localStorage.getItem('token') === null)) {
      this.token = '';
      this.persona = null;
      this.personaId = null;
      this.menuBack = [];
    } else {
      const var1 = localStorage.getItem('token');
      this.token = var1;

      this.usuario = localStorage.getItem('usuario');

      const var3 = localStorage.getItem('id');
      this.personaId = var3;

      // this.menuBack = localStorage.getItem('menu');
      // this.menu = JSON.parse( localStorage.getItem('menu') );
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
//        Renueva TOKEN
// ==================================================
  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';

    // return this.http.get( url,
    //   {
    //     headers: {
    //       token: this.token
    //     }
    //   }
    //   ).map( (resp: any) => {

    //               this.token = resp.token;
    //               localStorage.setItem('token', this.token );

    //               return true;
    //             })
    //             .catch( err => {
    //               this.router.navigate(['/login']);
    //               Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'error',
    //                 title: 'No se pudo renovar token',
    //                 showConfirmButton: false,
    //                 timer: 2000
    //               });
    //               // tslint:disable-next-line: deprecation
    //               return Observable.throw( err );
    //             });


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
  this.persona = null;
  this.token = '';
  this.personaId = null;
  this.IdRol = null;
  this.usuario = null;
  this.menuBack = [];


  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('usuario');
  localStorage.removeItem('menu');



  this.router.navigate(['/login']);
}

}
