import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  configuraciones: any;

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
    this.configuracionesService.listarConfiguraciones(  )
      .subscribe( (resp: any) => {

     console.log("configuraciones es : ",resp)

     this.configuraciones = resp[0][0];


   });
  }

  goTwitter() {
    window.location.href='https://twitter.com/' + this.configuraciones.twitter;
}

goFacebook() {
  window.location.href='https://www.facebook.com/' + this.configuraciones.facebook;
}

goInstagram() {
  window.location.href='https://www.instagram.com/'+ this.configuraciones.instagram;
}

goYouTube() {
  window.location.href='https://www.youtube.com/' + this.configuraciones.youtube;
}


}
