import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocionesComponent } from './listar-promocion/promociones.component';
import { PromocionComponent } from './promocion/promocion.component';

const routes: Routes = [
//
{ path: '', component: PromocionesComponent, data: { titulo: 'Promociones' }},
{ path: 'nueva', component: PromocionComponent, data: { titulo: 'Nueva Promocion' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocionesRoutingModule { }
