import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoDolaresComponent } from './historico/historico-dolares.component';
import { VentaDolarComponent } from './vender-dolar/venta-dolar.component';
import { CompraDolarComponent } from './compra-dolar/compra-dolar.component';

const routes: Routes = [
  { path: '', component: HistoricoDolaresComponent, data: { titulo: 'Compra/Venta dolares' }},
  { path: 'venta', component: VentaDolarComponent, data: { titulo: 'Nueva venta' }},
  { path: 'compra', component: CompraDolarComponent, data: { titulo: 'Nueva compra' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DolaresRoutingModule { }
