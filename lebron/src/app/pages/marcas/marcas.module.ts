import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';


@NgModule({
  declarations: [
    MarcasComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule
  ]
})
export class MarcasModule { }
