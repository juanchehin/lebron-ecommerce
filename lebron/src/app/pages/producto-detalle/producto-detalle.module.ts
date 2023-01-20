import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoDetalleRoutingModule } from './producto-detalle-routing.module';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { FormsModule } from '@angular/forms';
import { ProductosRelacionadosComponent } from '../productos-relacionados/productos-relacionados/productos-relacionados.component';
import { ProductosRelacionadosModule } from '../productos-relacionados/productos-relacionados.module';


@NgModule({
  declarations: [
    ProductoDetalleComponent
  ],
  imports: [
    CommonModule,
    ProductoDetalleRoutingModule,
    FormsModule
  ]
})
export class ProductoDetalleModule { }
