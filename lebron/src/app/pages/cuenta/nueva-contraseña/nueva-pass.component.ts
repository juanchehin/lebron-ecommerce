import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nueva-pass',
  templateUrl: './nueva-pass.component.html',
  styleUrls: ['./nueva-pass.component.css']
})
export class NuevaPassComponent implements OnInit {

  errorEmail = false;
  formularioNuevaContraseña!: FormGroup;
  passCheck = false;
  passSecure = false;
  token: any;

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
    public route: Router,
    public activatedRoute: ActivatedRoute
    ) { }
  ngOnInit() {
    
    this.token = this.activatedRoute.snapshot.paramMap.get('pToken');

    this.formularioNuevaContraseña = new FormGroup({
      Password: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(this.pattern)
         ] ),
      Password2: new FormControl(null, Validators.required )
    }, {
      // validators: this.checkPasswords
    })

  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  recuperarClave(forma: NgForm) {

    if ( this.formularioNuevaContraseña.controls['Password'].status == 'INVALID') {
      this.passSecure = true;
      return;
    } 
  
    if(this.formularioNuevaContraseña.value.Password != this.formularioNuevaContraseña.value.Password2){
      this.passCheck = true;
      return;
    }
  
    if ( this.formularioNuevaContraseña.invalid ) {
      return;
    }

    this.authService.nuevaClave(this.token,forma.value.Password)
      .subscribe({
      next: (resp: any) => { 

      if ( resp === true) {
        // Mostrar mensaje de que se envio el mail y chequee la casilla

        // this.router.navigate(['/']);
        return;
      }else {
         this.route.navigate(['/failure']);                    
       }
      },
     error: () => { 
       this.route.navigate(['/failure']);
      }
   });

  }

}
