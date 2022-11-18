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
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
  }

  // ***
  comprobarLogueo() {
    if(!this.authService.estaLogueado())
    { 
      this.router.navigate(['/']);
    }
  }

}
