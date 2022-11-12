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


}
