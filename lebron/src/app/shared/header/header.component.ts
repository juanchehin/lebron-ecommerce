import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  marcas!: any;
  subcategorias!: any;
  categorias!: any;

  constructor(
    private marcasService: MarcasService,
    private categoriasService: CategoriasService

  ) {

  }

  ngOnInit() {
        this.cargarMarcas();
        this.cargarCategoriasSubcategorias();
  }

// ==================================================
// Carga
// ==================================================

cargarMarcas() {

    this.marcasService.dameMarcas( )
               .subscribe( (resp: any) => {

                this.marcas = resp[0];

              });

  }

// ==================================================
// Carga
// ==================================================

cargarCategoriasSubcategorias() {
  console.log("pasa cargarCategoriasSubcategorias");

    this.categoriasService.listarCategoriasSubcategorias( )
               .subscribe( (resp: any) => {

                console.log("resp cargarCategoriasSubcategorias es : ",resp)

                this.categorias = resp[0];
                this.subcategorias = resp[1];

                console.log("resp categorias es : ",this.categorias)
                console.log("resp subcategorias es : ",this.subcategorias)

              });

  }

}
