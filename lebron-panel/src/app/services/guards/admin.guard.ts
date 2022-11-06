import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PersonaService } from '../persona.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public personaService: PersonaService,
    public router: Router) {
  }

  canActivate() {

    if ( this.personaService.IdRol !== 3) {  // 3: Rol Admin
      this.personaService.logout();
      return false;

    } else {
      return true;
    }
  }
}
