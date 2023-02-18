import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversoresComponent } from './inversores/inversores.component';
import { InversorComponent } from './inversor/inversor.component';
import { EditarInversorComponent } from './editar-inversor/editar-inversor.component';
import { HistoricoInversorComponent } from './historico-inversor/historico-inversor.component';

const routes: Routes = [
  { path: '', component: InversoresComponent, data: { titulo: 'Listado de inversores' }},
  { path: 'nuevo', component: InversorComponent, data: { titulo: 'Nuevo inversor' }},
  { path: ':IdPersona', component: EditarInversorComponent, data: { titulo: 'Edicion de inversor' }},
  { path: 'historico/:IdPersona', component: HistoricoInversorComponent, data: { titulo: 'Historial de inversiones' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InversoresRoutingModule { }
