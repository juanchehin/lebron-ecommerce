import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador/buscador.component';


@NgModule({
  declarations: [
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    BuscadorRoutingModule
  ]
})
export class BuscadorModule { }
