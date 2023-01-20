import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosPromocionRoutingModule } from './productos-promocion-routing.module';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';


@NgModule({
  declarations: [
    ProductosPromocionComponent
  ],
  imports: [
    CommonModule,
    ProductosPromocionRoutingModule
  ]
})
export class ProductosPromocionModule { }
