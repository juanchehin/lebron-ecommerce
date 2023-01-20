import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

const ruta_img_marcas = environment.ruta_img_marcas;

@Component({
  selector: 'app-slider-marcas',
  templateUrl: './slider-marcas.component.html',
  styles: []
})
export class SliderMarcasComponent implements OnInit {

  desde = 0;
  url_imagenes_marcas = ruta_img_marcas;
  marcas!: any;
  activarSlider = false;

  constructor(
    public usuariosService: UsuariosService,
    private marcasService: MarcasService
  ) {
   }

  ngOnInit() {
    this.cargarMarcasSlider();
  }

// ==================================================
// Carga
// ==================================================

cargarMarcasSlider() {

    this.marcasService.dameMarcas(   )
               .subscribe( {
                next: (resp: any) => {

                  this.marcas = resp[0];

                  if(this.marcas.length <= 0)
                  {
                    this.activarSlider = false;
                  }
                },
                error: () => {this.activarSlider = false  }
      });

  }




}
