import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarGastosComponent } from './gastos/listar-gastos/listar-gastos.component';
import { NuevoGastoComponent } from './gastos/nuevo-gasto/nuevo-gasto.component';
import { ComprasComponent } from './listar-compras/compras.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { NuevaCompraComponent } from './nueva-compra/nueva-compra.component';

const routes: Routes = [
  //
  { path: '', component: ComprasComponent, data: { titulo: 'Listado de compras' }},
  { path: 'nueva', component: NuevaCompraComponent, data: { titulo: 'Nueva compra' }},
  { path: 'editar/:IdCompra', component: MisComprasComponent, data: { titulo: 'Mis compras' }},
  //
  { path: 'gastos', component: ListarGastosComponent, data: { titulo: 'Listado de gastos' }},
  { path: 'gastos/nuevo', component: NuevoGastoComponent, data: { titulo: 'Nuevo gasto' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
