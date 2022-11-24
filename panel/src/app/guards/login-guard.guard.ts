import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }
  canActivate() {
    if ( this.authService.estaLogueado()) {
      return true;
     } else {
       this.router.navigate(['/login']);
       return false;
    }
  }

}
