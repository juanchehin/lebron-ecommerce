import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { CuentasComponent } from './cuentas-corrientes/cuentas/cuentas.component';
import { CuentaComponent } from './cuentas-corrientes/cuenta/cuenta.component';
import { EditarClienteCuentaComponent } from './cuentas-corrientes/editar-cliente-cuenta/editar-cliente-cuenta.component';

const routes: Routes = [
  { path: '', component: ClientesComponent, data: { titulo: 'Listado de clientes' }},
  { path: 'nuevo', component: ClienteComponent, data: { titulo: 'Nuevo cliente' }},
  { path: 'editar/:IdPersona', component: EditarClienteComponent, data: { titulo: 'Edicion de cliente' }},
  // Cuentas corr
  { path: 'cuentas', component: CuentasComponent, data: { titulo: 'Cuentas corrientes' }},
  { path: 'cuentas/nueva', component: CuentaComponent, data: { titulo: 'Nuevo cuenta' }},
  { path: 'cuenta/editar/:IdPersona', component: EditarClienteCuentaComponent, data: { titulo: 'Edicion de cuenta corriente' }},
  { path: 'cuenta/movimientos/:IdPersona', component: EditarClienteCuentaComponent, data: { titulo: 'Movimientos de cuenta corriente' }},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
