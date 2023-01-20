import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionalRoutingModule } from './institucional-routing.module';
import { ContactoComponent } from './contacto/contacto.component';
import { PoliticasComponent } from './politicas-seguridad/politicas-seguridad.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { FranquiciaComponent } from './franquicia/franquicia.component';


@NgModule({
  declarations: [
    ContactoComponent,
    FranquiciaComponent,
    PoliticasComponent,
    TerminosCondicionesComponent
  ],
  imports: [
    CommonModule,
    InstitucionalRoutingModule
  ]
})
export class InstitucionalModule { }
