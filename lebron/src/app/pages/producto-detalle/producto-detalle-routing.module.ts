import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';

const routes: Routes = [
  { path: '', component: ProductoDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoDetalleRoutingModule { }
