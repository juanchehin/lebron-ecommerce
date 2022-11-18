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
  loginCliente(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const persona = new Array(
      forma.value.email,
      forma.value.password
    );

    // Llamada al servicio

    this.authService.loginCliente(persona)
        .subscribe((resp: any) => {

          console.log("resp es : " + resp)
          if ( resp === true) {
            this.router.navigate(['/']);
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
