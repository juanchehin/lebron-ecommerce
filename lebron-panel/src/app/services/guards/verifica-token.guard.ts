import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonaService } from '../persona.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public personaService: PersonaService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {


    const token = this.personaService.token;  // TOKEN <-- String en base64
    const payload = JSON.parse( atob(token.split('.')[1]));  // <-- Obtengo la info del token, desde base64

    const expirado = this.expirado(payload.exp);

    if ( expirado ) {
      console.log("pasa expirado")
      this.personaService.logout();
      return false;
    } else {
      console.log("pasa else")
      return this.verificaRenueva(payload.exp);
    }
  }

// ==================================================
//        Renueva el token
// ==================================================

  verificaRenueva( fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject ) => {
      const tokenExp = new Date( fechaExp * 1000);
      const ahora = new Date();  // <-- Traer la fecha desde la BD por que esta es la fecha del sistema que puede ser modificada

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );  // Fecha actual + 4 hs


      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else{

        // this.personaService.renuevaToken()
        //   .subscribe( () => {
        //     resolve(true);
        //   }, () => {
        //     this.router.navigate(['/login']);
        //     reject(false);
        //   });
      }

      resolve(true);

    });
  }

// ==================================================
//        Verifica si el token expiro
// ==================================================

  expirado(fechaExp: number) {  // <-- Obtiene la fecha de expiracion del token
    const ahora = new Date().getTime() / 1000;  // <-- Fecha actual en [ms]

    if( fechaExp < ahora ){
      return true;
    } else{
      return false;
    }
  }
}
