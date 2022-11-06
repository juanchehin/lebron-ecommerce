import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalAdminGuard implements CanActivate {

  constructor(
    public personaService: PersonaService,
    public router: Router) {
  }

  canActivate() {
    if ( (this.personaService.IdRol === 3) || ( this.personaService.IdRol === 2) ) {
      return true;
    } else {
      this.personaService.logout();
      return false;
    }
  }
}
