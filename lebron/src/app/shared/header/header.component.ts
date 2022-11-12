import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  marcas!: any;

  constructor(
    private marcasService: MarcasService
  ) {

  }

  ngOnInit() {
        this.cargarMarcas();
  }

// ==================================================
// Carga
// ==================================================

cargarMarcas() {
  console.log("pasa cargarMarcas");

    this.marcasService.dameMarcas( )
               .subscribe( (resp: any) => {

                console.log("resp es : ",resp)

                this.marcas = resp[0];

              });

  }

}
