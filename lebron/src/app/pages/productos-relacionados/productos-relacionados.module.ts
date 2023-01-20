import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRelacionadosRoutingModule } from './productos-relacionados-routing.module';
import { ProductosRelacionadosComponent } from './productos-relacionados/productos-relacionados.component';


@NgModule({
  declarations: [
    ProductosRelacionadosComponent
  ],
  imports: [
    CommonModule,
    ProductosRelacionadosRoutingModule
  ]
})
export class ProductosRelacionadosModule { }
