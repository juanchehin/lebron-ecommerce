import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaPermisoGuard implements CanActivate {

  menuPermisos: any[] = [];

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  // =====
  canActivate(route: ActivatedRouteSnapshot) {  
    this.cargarDatosMenu();

    const chequearRuta = route.data['ruta'];
    
    const found = this.menuPermisos.find((obj) => {
      return obj.permiso === chequearRuta;
    });

    if (found !== undefined) {
      return true;
    } else {
      this.authService.logout();
      return false;
    }
  }

  // **** ===
  cargarDatosMenu() {
    var long: any = localStorage.getItem('menu')?.length;

    if(long == undefined || long <= 0){
      this.authService.logout();
      return;
    }

    if(this.authService.menuBack.length <= 0)
    {
      this.menuPermisos = JSON.parse(localStorage.getItem('menu')!);
    }
    else{
      this.menuPermisos = this.authService.menuBack;
    }
  }
}
