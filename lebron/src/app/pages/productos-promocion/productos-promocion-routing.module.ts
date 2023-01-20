import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';

const routes: Routes = [
  { path: '', component: ProductosPromocionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosPromocionRoutingModule { }
