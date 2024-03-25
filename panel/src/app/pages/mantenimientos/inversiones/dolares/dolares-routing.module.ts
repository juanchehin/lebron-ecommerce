import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoDolaresComponent } from './historico/historico-dolares.component';

const routes: Routes = [
  { path: '', component: HistoricoDolaresComponent, data: { titulo: 'Compra/Venta dolares' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DolaresRoutingModule { }
