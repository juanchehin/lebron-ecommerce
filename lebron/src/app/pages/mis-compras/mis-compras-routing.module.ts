import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisComprasComponent } from './mis-compras/mis-compras.component';

const routes: Routes = [
  { path: '', component: MisComprasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisComprasRoutingModule { }
