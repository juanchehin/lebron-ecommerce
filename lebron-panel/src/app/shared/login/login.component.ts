import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
    ) { }
  ngOnInit() {
    this.authService.logout();
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const persona = new Array(
      forma.value.email,
      forma.value.password
    );

    // Llamada al servicio

    this.authService.login(persona)
        .subscribe((resp: any) => {

          if ( resp === true) {
            this.router.navigate(['/dashboard']);
            return;
          }

          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error de credenciales',
          //   text: 'Error de credenciales',
          // });
      },
      ( error: any) => {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Ha ocurrido un error',
          //   text: 'Contactese con el administrador',
          // });
      }

      );

  }

}
