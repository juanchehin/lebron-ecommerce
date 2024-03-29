import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './listar-ventas/ventas.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { VentasQuimicosComponent } from './listar-ventas-quimicos/ventas-quimicos.component';
import { NuevaVentaQuimicosComponent } from './nueva-venta-quimicos/nueva-venta-quimicos.component';
import { EditarVentaComponent } from './editar-venta/editar-venta.component';

const routes: Routes = [
  { path: 'listar', component: VentasComponent, data: { titulo: 'Listado de Ventas' }},
  { path: 'quimicos', component: VentasQuimicosComponent, data: { titulo: 'Venta de quimicos' }},
  { path: 'quimicos/nueva-venta', component: NuevaVentaQuimicosComponent, data: { titulo: 'Nueva venta quimicos' }},

  { path: 'nueva', component: NuevaVentaComponent, data: { titulo: 'Nueva venta' }},
  { path: 'editar/:pIdVenta', component: EditarVentaComponent, data: { titulo: 'Edicion venta' }},
  // Pedidos
  { path: 'pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
