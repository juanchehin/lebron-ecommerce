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
  DNI!: any;
  Telefono!: any;
  errorTelefono = false;
  errorDNI = false;
  errorEmail = false;

  constructor(
    public authService: AuthService,
    public clientesService: ClientesService,
    public router: Router
    ) { }
  ngOnInit() {
    this.comprobarLogueo();
    this.cargarDatosCliente();

  }
// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarDatosCliente() {

  this.clientesService.dameDatosCliente( )
             .subscribe( (resp: any) => {

              this.datosCliente = resp[0];

              this.Email = this.datosCliente.Email;
              this.Password =  this.datosCliente.Password;
              this.Apellidos =  this.datosCliente.Apellidos;
              this.Nombres = this.datosCliente.Nombres;
              this.DNI = this.datosCliente.DNI;
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
// ==================================================
//     
// ==================================================
actualizarCliente(){

  if(this.isValidPhone(this.Telefono)){
    this.errorTelefono = true;
    return;
  }

  this.errorTelefono = false;

  if(this.isNumber(this.DNI)){
    this.errorDNI = true;
    return;
  }

  this.errorDNI = false;

  if(this.validateEmail(this.Email)){
    this.errorEmail = true;
    return;
  }

  this.errorEmail = false;  

  const clienteEditado = new Array(
    this.Apellidos,
    this.Nombres,
    this.Telefono,
    this.DNI,
    this.Email
  );

  this.clientesService.editarCliente( clienteEditado )
            .subscribe( {
              next: (resp: any) => {
              
                if ( (resp != null) && (resp.Mensaje == 'Ok') ) {
                  
                  this.router.navigate(['/actualizacion-cuenta']);
                } else {
                  this.router.navigate(['/failure'])
                }
                return;
               },
              error: () => { this.router.navigate(['/failure']) }
            });

        };

// =========
isValidPhone(p: any) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
}

// =======================
isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}
// =======================
validateEmail(email: any) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

}
