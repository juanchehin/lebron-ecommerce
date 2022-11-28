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

    // if ( this.authService.IdRol !== 3) {  // 3: Rol Admin
    //   this.authService.logout();
    //   return false;

    // } else {
      return true;
    // }
  }
}
