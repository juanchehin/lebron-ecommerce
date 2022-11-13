import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  configuraciones: any;

  twitter = '';
  facebook = '';
  youtube = '';
  instagram = '';
  direccion = '';
  telefono = '';
  email = '';

  constructor(
    private configuracionesService: ConfiguracionesService
   ) {

    }

  ngOnInit() {
    this.listarConfiguracionesEmpresa();
  }

  // ==============================
  listarConfiguracionesEmpresa()
  {
    // this.configuraciones = '';

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


}
