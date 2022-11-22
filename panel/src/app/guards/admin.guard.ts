import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router) {
  }

  canActivate() {

    // IdRol '1' es un usuario del sistema del panel
    if ( this.authService.IdRol !== 1) {
      this.authService.logout();
      return false;

    } else {
      return true;
    }
  }
}
