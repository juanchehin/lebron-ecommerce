import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  configuraciones: any;
  categoriasDestacadas: any;

  twitter = '';
  facebook = '';
  youtube = '';
  instagram = '';
  direccion = '';
  telefono = '';
  email = '';
  monto_envio_gratis = 0;

  constructor(
    private configuracionesService: ConfiguracionesService,
    private router: Router
   ) {

    }

  ngOnInit() {
    this.listarDatosFooter();
  }

  // ==============================
  listarDatosFooter()
  {

    this.configuracionesService.listarDatosFooter(  )
      .subscribe( (resp: any) => {

        this.configuraciones = resp[0][0];
        this.categoriasDestacadas = resp[1];

        this.direccion = resp[0][0].direccion;
        this.telefono = resp[0][0].telefono;
        this.email = resp[0][0].email;

        this.twitter = resp[0][0].twitter;
        this.facebook = resp[0][0].facebook;
        this.instagram = resp[0][0].instagram;
        this.youtube = resp[0][0].youtube;
        this.monto_envio_gratis = Math.floor(resp[0][0].monto_envio_gratis);

   });
  }

  // ==============================
  listarCategoriasDestacadas()
  {
    this.configuracionesService.listarConfiguraciones(  )
      .subscribe( (resp: any) => {

      this.configuraciones = resp[0][0];

      this.direccion = resp[0][0].direccion;
      this.telefono = resp[0][0].telefono;
      this.email = resp[0][0].email;

      this.twitter = resp[0][0].twitter;
      this.facebook = resp[0][0].facebook;
      this.instagram = resp[0][0].instagram;
      this.youtube = resp[0][0].youtube;

   });
  }

  goTwitter() {
    window.location.href='https://twitter.com/' + this.twitter;
}

goFacebook() {
  window.location.href='https://www.facebook.com/' + this.facebook;
}

goInstagram() {
  window.location.href='https://www.instagram.com/'+ this.instagram;
}

goYouTube() {
  window.location.href='https://www.youtube.com/' + this.youtube;
}


// ==================================================
// Carga
// ==================================================

async rutearCategoria(IdCategoria: any) {
  
  var url = "/categoria/" + IdCategoria;

  await this.router.navigateByUrl('.', { skipLocationChange: true });


  return this.router.navigateByUrl(url);

}

}
