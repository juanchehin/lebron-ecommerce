import { Injectable } from '@angular/core';
import { CanActivate, Router, Routes } from '@angular/router';
import { PersonaService } from '../persona.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public personaService: PersonaService, public router: Router) {
  }
  canActivate() {
    if ( this.personaService.estaLogueado()) {
      return true;
     } else {
       this.router.navigate(['/login']);
       return false;
    }
  }

}
