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

  persona!: any;
  personaValor!: any;
  IdPersona!: any;
  IdRol: any;
  token!: any;
  usuario: any;
  menuBack: any[] = Array();

  private IdPersonaSource = new BehaviorSubject<string>('');
  public  quoteIdPersona = this.IdPersonaSource.asObservable();  // 


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
//        Logueo de la persona
// ==================================================
login( persona: any ): any {

  const url = URL_SERVICIOS + '/login/usuario';

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {
              console.log('resp::: ', resp);
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

      this.setIdPersona(resp.IdPersona);  //

      this.IdRol = resp.IdRol;
      
      this.guardarStorage( resp.IdPersona, resp.token, resp.usuario, resp.menu, resp.IdRol);
      this.cargarStorage();

      return true;
    }));


}

// ==================================================
//        Guarda la info en el localstorage
//  Guarda en las variables del servicio
// ==================================================
guardarStorage( id: string, token: string, usuario: any, menu: any[], IdRol: any ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('menu', JSON.stringify(menu) );
  localStorage.setItem('usuario', usuario );

  this.IdRol = IdRol;
  this.token = token;
  this.IdPersona = id;
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
      this.IdPersona = null;
      this.menuBack = [];
    } else {
      const var1 = localStorage.getItem('token');
      this.token = var1;

      this.usuario = localStorage.getItem('usuario');

      const var3 = localStorage.getItem('id');
      this.IdPersona = var3;
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
    return( this.token.length > 5) ? true : false;

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
  this.persona = null;
  this.token = '';
  this.IdPersona = null;
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
