import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
var $ = require( "jquery" );
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: any;
  banderaOcultarSidebar = false;

  constructor( private authService: AuthService,
               private router: Router ) {
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

    //   // this is for close icon when navigation open in mobile view
    //   $(".nav-toggler").click(function() {
    //     console.log("pasa sidebar mobile")
    //     $("body").toggleClass("show-sidebar");
    //     $(".nav-toggler i").toggleClass("ti-menu");
    //     $(".nav-toggler i").addClass("ti-close");
    // });
    
  }

}
