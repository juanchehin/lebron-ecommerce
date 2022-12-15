import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegistroCliente!: FormGroup;
  respuesta: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;
  Cliente: any;
  emailExistente = false;
  telefonoExistente = false;
  passCheck = false;
  passSecure = false;

  passRequirement = {
    passwordMinLowerCase: 1,
    passwordMinNumber: 1,
    passwordMinUpperCase: 1,
    passwordMinCharacters: 8
  };
  pattern = [
    `(?=([^a-z]*[a-z])\{${this.passRequirement.passwordMinLowerCase},\})`,
    `(?=([^A-Z]*[A-Z])\{${this.passRequirement.passwordMinUpperCase},\})`,
    `(?=([^0-9]*[0-9])\{${this.passRequirement.passwordMinNumber},\})`,
    `[A-Za-z\\d\$\@\$\!\%\*\?\&\.]{${
      this.passRequirement.passwordMinCharacters
    },}`
  ]
    .map(item => item.toString())
    .join("");

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
      Password: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(this.pattern)
         ] ),
      Password2: new FormControl(null, Validators.required ),
      Email: new FormControl( null , [Validators.required , Validators.email ])
    }, {
      // validators: this.checkPasswords
    })
  }

// ==================================================
//        Nuevo cliente
// ==================================================

registrarCliente() {

  console.log(" controls :  ",this.formularioRegistroCliente.controls)

  if ( this.formularioRegistroCliente.controls['Password'].status == 'INVALID') {
    this.passSecure = true;
    return;
  } 

  if(this.formularioRegistroCliente.value.Password != this.formularioRegistroCliente.value.Password2){
    this.passCheck = true;
    return;
  }

  if ( this.formularioRegistroCliente.invalid ) {
    return;
  }
  
  this.passCheck = false;
  this.passSecure = false;

  const cliente = new Array(
    this.formularioRegistroCliente.value.Email,
    this.formularioRegistroCliente.value.Password,
    this.formularioRegistroCliente.value.Apellidos,
    this.formularioRegistroCliente.value.Nombres,
    this.formularioRegistroCliente.value.Telefono
  );


  this.clienteService.altaCliente( cliente  )
  .subscribe({
    next: (resp: any) => { 

      console.log("resp es : ",resp)

      if(resp.Mensaje != 'Ok') {
        
          if (resp.Mensaje === 'Ya existe un correo con ese nombre') {
              this.emailExistente = true;
              return;
            } else {
              this.emailExistente = false;
            }

            if (resp.Mensaje === 'El telefono ya existe') {
              this.telefonoExistente = true;
              return;
            } else {
              this.telefonoExistente = false;
            }

            this.router.navigate(['/failure']);  
        
      } else {
        
        this.router.navigate(['/cuenta-creada']);
      }
     },
    error: (err: any) => { 
      this.router.navigate(['/failure']);
     }
  });

}

}
