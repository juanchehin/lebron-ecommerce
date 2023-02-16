import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
var $ = require( "jquery" );
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: any;

  constructor( private usuarioService: UsuariosService,
              private authService: AuthService,
               private router: Router ) {
    // this.usuario = usuarioService.usuario;
  }

  logout() {
    this.authService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

  // ==================
  mostrarOcultarSidebar( ) {
    
    if ($("body").hasClass("mini-sidebar")) {

      $("body").trigger("resize");
      $("body").removeClass("mini-sidebar");
      $('.navbar-brand span').show();
      
  } else {
      $("body").trigger("resize");
      $("body").addClass("mini-sidebar");
      $('.navbar-brand span').hide();
      
  }
  }

}
