import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosRelacionadosComponent } from './productos-relacionados/productos-relacionados.component';

const routes: Routes = [{ path: '', component: ProductosRelacionadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRelacionadosRoutingModule { }
