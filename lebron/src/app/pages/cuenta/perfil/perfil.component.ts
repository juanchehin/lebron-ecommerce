import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public router: Router
    ) { }
  ngOnInit() {
    this.cargarIdPersona();
    
  }

   // ***
   cargarIdPersona() {
    this.authService.quoteIdPersona.subscribe((dataIdPersona : any) => { 
      this.IdPersona = dataIdPersona;
    });

  }

}
