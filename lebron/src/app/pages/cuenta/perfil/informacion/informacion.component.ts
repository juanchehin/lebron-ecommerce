import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  formularioRegistroCliente!: FormGroup;
  respuesta: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;
  Cliente: any;
  IdPersona: any;

  constructor(
    public authService: AuthService,
    public clientesService: ClientesService,
    public router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  ngOnInit() {
    // this.authService.logout();
    this.cargarDatosCliente();

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
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarDatosCliente() {

  this.IdPersona = this.activatedRoute.snapshot.paramMap.get('id');

  this.clientesService.dameDatosCliente( this.IdPersona )
             .subscribe( (resp: any) => {

              console.log("resp es : ",resp)
              this.persona = resp[0];

              this.Correo = this.persona.Correo;
              this.Password =  this.persona.Password;
              this.IdTipoDocumento =  this.persona.IdTipoDocumento;
              this.Apellidos =  this.persona.Apellidos;
              this.Nombres = this.persona.Nombres;
              this.Documento = this.persona.Documento;
              this.Password2 =  this.persona.Password;
              this.Telefono =  this.persona.Telefono;
              this.Observaciones = this.persona.Observaciones;
              this.FechaNac =  this.persona.FechaNac;
              this.Usuario = this.persona.Usuario;
              this.Objetivo = this.persona.Objetivo;
              this.Ocupacion = this.persona.Ocupacion;
              this.Horario = this.persona.Horario;
              this.Calle =  this.persona.Calle;
              this.Piso =  this.persona.Piso;
              this.Departamento = this.persona.Departamento;
              this.Ciudad =  this.persona.Ciudad;
              this.Pais =  this.persona.Pais;
              this.Numero =  this.persona.Numero;
              this.Sexo = this.persona.Sexo;
              this.Estado = this.persona.EstadoCli;
              this.FechaInicio = this.persona.FechaInicio;
              this.FechaNac = this.persona.FechaNac;

              this.cargando = false;

            });

}
// ==================================================
//  Proceso de LOGUEO
// ==================================================
  ingresar(formularioRegistroCliente: NgForm) {

    if ( formularioRegistroCliente.invalid ) {
      return;
    }

    const persona = new Array(
      formularioRegistroCliente.value.email,
      formularioRegistroCliente.value.password
    );

    // Llamada al servicio

    this.authService.loginCliente(persona)
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
