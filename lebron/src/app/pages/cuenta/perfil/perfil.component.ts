import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  IdPersona: any;

  constructor(
    private authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  ngOnInit() {
    // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarIdPersona();
    
  }

   // ***
   cargarIdPersona() {
    console.log("pasa cargarIdPersona perfil")

    this.IdPersona = this.authService.IdPersona;

    console.log("IdPersona perfilcomponent cargarIdPersona es : ",this.IdPersona);

    if(this.IdPersona == 'undefined' || this.IdPersona == null || this.IdPersona <= 0)
    { 
      this.authService.logout();
    }

  }

  // ***
  comprobarLogueo() {
    console.log("pasa comprobarLogueo perfil")
    if(!this.authService.estaLogueado())
    { 
      this.router.navigate(['/']);
    }
  }

}
