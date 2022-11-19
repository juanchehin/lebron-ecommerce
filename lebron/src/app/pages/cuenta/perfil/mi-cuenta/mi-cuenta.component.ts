import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styles: []
})
export class MiCuentaComponent implements OnInit {

  formularioRegistroCliente!: FormGroup;
  datosCliente: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;
  Cliente: any;
  IdPersona: any;

  
  Email!: string;
  Password!: string;
  Apellidos!: string;
  Nombres!: string;
  Documento!: string;
  Telefono!: string;

  constructor(
    public authService: AuthService,
    public clientesService: ClientesService,
    public router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  ngOnInit() {
    this.comprobarLogueo();
    this.cargarDatosCliente();

    this.formularioRegistroCliente = new FormGroup({
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      Documento: new FormControl(null ),
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
  console.log("cargarDatosCliente es : ")

  this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

  this.clientesService.dameDatosCliente( this.IdPersona )
             .subscribe( (resp: any) => {

              console.log("resp es : ",resp)
              this.datosCliente = resp[0];

              this.Email = this.datosCliente.Email;
              this.Password =  this.datosCliente.Password;
              this.Apellidos =  this.datosCliente.Apellidos;
              this.Nombres = this.datosCliente.Nombres;
              this.Documento = this.datosCliente.Documento;
              this.Telefono =  this.datosCliente.Telefono;

              this.cargando = false;

            });

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

// ***
comprobarLogueo() {
  if(!this.authService.estaLogueado())
  { 
    this.router.navigate(['/']);
  }
}

actualizarCliente(){
  
}
}
