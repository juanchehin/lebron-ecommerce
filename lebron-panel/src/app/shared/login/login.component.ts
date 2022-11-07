import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
// import { Persona } from '../../models/persona.model';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public personaService: PersonaService,
    public router: Router
    // public headerService: HeaderService
    ) { }
  ngOnInit() {
    this.personaService.logout();
    // this.personaService.actualizaEstadoCliente();
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

    this.personaService.login(persona)
        .subscribe((resp: any) => {

          if ( resp === true) {
            this.router.navigate(['/principal']);
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
