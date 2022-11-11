import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { MapaComponent } from './mapa/mapa.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { DestacadosComponent } from './destacados/destacados.component';
import { PromocionesComponent } from './promociones/promociones.component';

@NgModule({
    declarations: [
        PagesComponent,
        SliderComponent,
        PromocionesComponent,
        DestacadosComponent,
        OfertasComponent
    ],
    exports: [
        PagesComponent
    ],
    imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
    ]
})

export class PagesModule { }
