import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocionDetalleComponent } from './promocion-detalle/promocion-detalle.component';

const routes: Routes = [
  { path: '', component: PromocionDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocionDetalleRoutingModule { }
