import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styles: []
})
export class MailComponent implements OnInit {

  formularioRegistroCliente!: FormGroup;
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

    this.formularioRegistroCliente = new FormGroup({
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      Password: new FormControl(null, Validators.required ),
      Password2: new FormControl(null, Validators.required ),
      Email: new FormControl( null , [Validators.required , Validators.email ])
    }, {
      // validator: this.sonIguales('Password' , 'Password2')
    })
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

  if ( this.formularioRegistroCliente.invalid ) {
    return;
  }

  const cliente = new Array(
    this.formularioRegistroCliente.value.Email,
    this.formularioRegistroCliente.value.Password,
    this.formularioRegistroCliente.value.Apellidos,
    this.formularioRegistroCliente.value.Nombres
  );


  this.clienteService.altaCliente( cliente  )
            .subscribe( (resp: any) => {
                /*  TransformularioRegistroClienter resp.mensaje a JSON para que se pueda acceder*/
                // tslint:disable-next-line: align
                if ( resp.Mensaje === 'Ok') {
                  // Swal.fire({
                  //   position: 'top-end',
                  //   icon: 'success',
                  //   title: 'Cliente cargado',
                  //   showConfirmButton: false,
                  //   timer: 2000
                  // });
                  this.router.navigate(['/mail']);
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
