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
  formularioNuevaPass!: FormGroup;
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

    console.log("this.token es ; ",this.token)

    this.formularioNuevaPass = new FormGroup({
      Password: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(this.pattern)
         ] ),
      Password2: new FormControl(null, Validators.required )
    })

  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  recuperarClave() {

    console.log("status : ",this.formularioNuevaPass.controls['Password'].status)

    if ( this.formularioNuevaPass.controls['Password'].status == 'INVALID') {
      this.passSecure = true;
      return;
    } 
    this.passSecure = false;

    console.log("Password : ",this.formularioNuevaPass.value.Password)
    console.log("Password2 : ",this.formularioNuevaPass.value.Password2)



    if(this.formularioNuevaPass.value.Password != this.formularioNuevaPass.value.Password2){
      this.passCheck = true;
      return;
    }
    this.passCheck = false;
    if ( this.formularioNuevaPass.invalid ) {
      this.passSecure = true;
      return;
    }

    this.authService.nuevaClave(this.token,this.formularioNuevaPass.value.Password)
      .subscribe({
      next: (resp: any) => { 
      if (resp.Mensaje == 'Ok') {
        this.route.navigate(['/pass-recuperada']);
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
