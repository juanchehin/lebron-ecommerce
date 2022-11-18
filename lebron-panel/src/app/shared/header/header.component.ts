import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  correoActual: any;
  cargando = true;
  id!: number;
  sidebar = false;

  constructor(
    public usuariosService: UsuariosService
   ) {


    this.correoActual = localStorage.getItem('usuario'); // Cambiar esto y acceder desde el servicio, ver comentario de abajo
    // this.correoActual = this.personaService.usuario;

    }

  ngOnInit() {
    
  }

  // ================================
  ocultarSidebar()
  { 
    console.log("pasa sidebar ",this.sidebar);
    this.sidebar = !this.sidebar;
    this.usuariosService.ocultarSidebar = this.sidebar;
  }


}
