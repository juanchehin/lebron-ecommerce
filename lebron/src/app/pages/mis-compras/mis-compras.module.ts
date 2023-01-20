import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisComprasRoutingModule } from './mis-compras-routing.module';
import { MisComprasComponent } from './mis-compras/mis-compras.component';


@NgModule({
  declarations: [
    MisComprasComponent
  ],
  imports: [
    CommonModule,
    MisComprasRoutingModule
  ]
})
export class MisComprasModule { }
