import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionDetalleRoutingModule } from './promocion-detalle-routing.module';
import { PromocionDetalleComponent } from './promocion-detalle/promocion-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PromocionDetalleComponent
  ],
  imports: [
    CommonModule,
    PromocionDetalleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PromocionDetalleModule { }
