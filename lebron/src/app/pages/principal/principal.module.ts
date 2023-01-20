import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DestacadosComponent } from './destacados/destacados.component';
import { SliderMarcasComponent } from './slider-marcas/slider-marcas.component';
import { PromocionesComponent } from './promociones/promociones.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    CarouselComponent,
    DestacadosComponent,
    SliderMarcasComponent,
    PromocionesComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
