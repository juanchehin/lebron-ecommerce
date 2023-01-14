import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { EditarClienteCuentaComponent } from './editar-cliente-cuenta/editar-cliente-cuenta.component';
import { MovimientosComponent } from './movimientos/movimientos.component';

const routes: Routes = [
  { path: '', component: CuentasComponent, data: { titulo: 'Clientes con cuenta corriente' }},
  { path: 'nueva', component: CuentaComponent, data: { titulo: 'Nueva cuenta' }},
  { path: ':IdPersona', component: EditarClienteCuentaComponent, data: { titulo: 'Edicion de cliente' }},
  { path: 'movimientos/:IdPersona', component: MovimientosComponent, data: { titulo: 'Movimientos' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasCorrientesRoutingModule { }
