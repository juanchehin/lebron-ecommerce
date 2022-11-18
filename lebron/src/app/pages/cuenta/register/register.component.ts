import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  formulario!: FormGroup;
  respuesta: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;
  Cliente: any;

  constructor(
    public authService: AuthService,
    public clienteService: ClientesService,
    public router: Router
    ) { }
  ngOnInit() {
    // this.authService.logout();

    this.formulario = new FormGroup({
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      Password: new FormControl(null, Validators.required ),
      Password2: new FormControl(null, Validators.required ),
      Telefono: new FormControl(null ),
      Correo: new FormControl( null , [Validators.required , Validators.email ])
    }, {
      // validator: this.sonIguales('Password' , 'Password2')
    })
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  ingresar(formulario: NgForm) {

    if ( formulario.invalid ) {
      return;
    }

    const persona = new Array(
      formulario.value.email,
      formulario.value.password
    );

    // Llamada al servicio

    this.authService.login(persona)
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

  // ==================================================
//        Controla que las contraseñas sean iguales
// ==================================================
sonIguales( campo1: string, campo2: string ): any {


  return ( group: FormGroup ) => {

    const pass1 = group.controls[campo1].value;
    const pass2 = group.controls[campo2].value;

    if ( pass1 === pass2 ) {
      return null;
    }

    return {
      sonIguales: true
    };

  };

}

// ==================================================
//        Nuevo cliente
// ==================================================

registrarCliente() {

  if ( this.formulario.invalid ) {
    return;
  }

  const cliente = new this.Cliente(
    this.formulario.value.Correo,
    this.formulario.value.Password,
    this.formulario.value.Apellidos,
    this.formulario.value.Nombres,
    this.formulario.value.Telefono,
    this.formulario.value.DNI
  );



  this.clienteService.altaCliente( cliente  )
            .subscribe( (resp: any) => {

                /*  Transformularior resp.mensaje a JSON para que se pueda acceder*/
                // tslint:disable-next-line: align
                if ( resp.Mensaje === 'Ok') {
                  // Swal.fire({
                  //   position: 'top-end',
                  //   icon: 'success',
                  //   title: 'Cliente cargado',
                  //   showConfirmButton: false,
                  //   timer: 2000
                  // });
                  this.router.navigate(['/']);
                } else {
                  if (resp.Mensaje === 'La persona ya se encuentra cargada') {
                      // Swal.fire({
                      //   title: 'Persona ya cargada',
                      //   text: '¿Desea Reactivarlo?',
                      //   icon: 'info',
                      //   showCancelButton: true,
                      //   confirmButtonColor: '#3085d6',
                      //   cancelButtonColor: '#d33',
                      //   confirmButtonText: 'Si, activar'
                      // })
                      // .then( activar => {
                      //   this.parametro = resp.pIdPersona;
                      //   if (activar) {
                      //     this.activarCliente(this.parametro);
                      //     return;
                      //   }
                      // });
                    } else {
                      // Swal.fire({
                      //   icon: 'error',
                      //   title: 'Hubo un problema al cargar',
                      //   text: resp.Mensaje
                      // });
                    }
                  return;
                  // tslint:disable-next-line: align
                  }
                });
  return;
}

}
