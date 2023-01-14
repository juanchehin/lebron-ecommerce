import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';

const routes: Routes = [
  { path: '', component: TransferenciasComponent, data: { titulo: 'Transferencias' }},
  { path: 'nueva', component: TransferenciaComponent, data: { titulo: 'Nueva transferencia' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferenciasRoutingModule { }
