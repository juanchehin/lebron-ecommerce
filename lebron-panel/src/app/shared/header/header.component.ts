import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  correoActual: any;
  cargando = true;
  id!: number;

  constructor( ) {


    this.correoActual = localStorage.getItem('usuario'); // Cambiar esto y acceder desde el servicio, ver comentario de abajo
    // this.correoActual = this.personaService.usuario;

    }

  ngOnInit() {


  }


}
