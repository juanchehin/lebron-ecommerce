import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {


  constructor( private router: Router,              
               public authService: AuthService ) { }

  ngOnInit(): void {
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

  console.log("persona es : ",persona)

  this.authService.login(persona)
      .subscribe((resp: any) => {
        console.log("resp es : ",resp)
        if ( resp === true) {
          this.router.navigate(['/dashboard']);
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Error de credenciales',
          text: 'Error de credenciales',
        });
    },
    ( error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Contactese con el administrador',
        });
    }

    );

}


}
