import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  errorEmail = false;

  constructor(
    public authService: AuthService,
    public route: Router
    ) { }
  ngOnInit() {
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  recuperarClave(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    this.authService.recuperarClave(forma.value.email)
    .subscribe({
     next: (resp: any) => { 

      console.log("resp recuperar clave : ",resp)

      if ( resp.Mensaje == 'Ok') {
        // Mostrar mensaje de que se envio el mail y chequee la casilla

        this.route.navigate(['/chequear-mail']);
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
