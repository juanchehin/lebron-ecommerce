import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: '', component: ClientesComponent, data: { titulo: 'Listado de clientes' }},
  { path: 'nuevo', component: ClienteComponent, data: { titulo: 'Nuevo cliente' }},
  { path: ':IdPersona', component: EditarClienteComponent, data: { titulo: 'Edicion de cliente' }},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
