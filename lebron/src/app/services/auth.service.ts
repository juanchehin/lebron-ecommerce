import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token!: any;
  public IdPersona!: any;

  private IdPersonaSource = new BehaviorSubject<string>('');
  public quoteIdPersona = this.IdPersonaSource.asObservable();  // 

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

      this.guardarStorage( resp.id, resp.token);
      this.cargarStorage();

      return true;
    }));


}
// ==================================================
//        Guarda la info en el localstorage
//  Guarda en el storage la informacion recibida por parametros
// ==================================================
guardarStorage( id: string, token: string, ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );

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
  
  this.token = '';
  this.IdPersona = null;

  localStorage.removeItem('token');
  localStorage.removeItem('id');

  this.router.navigate(['/login']);
}

public get obtenerIdPersona(): string {
  console.log("this.idpersona es : ")
  return this.IdPersona;
}
}
