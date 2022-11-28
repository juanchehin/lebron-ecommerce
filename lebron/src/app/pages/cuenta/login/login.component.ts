import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorCredenciales = false;

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
          if ( resp === true) {
            this.router.navigate(['/']);
            return;
          }
      },
      ( error: any) => {
          this.errorCredenciales = true;
      }

      );

  }

}
