import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './listar-ventas/ventas.component';
import { MisVentasComponent } from './mis-ventas/mis-ventas.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PedidosComponent } from './pedidos/pedidos.component';
import { VentasQuimicosComponent } from './listar-ventas-quimicos/ventas-quimicos.component';
import { NuevaVentaQuimicosComponent } from './nueva-venta-quimicos/nueva-venta-quimicos.component';


@NgModule({
  declarations: [
    VentasComponent,
    VentasQuimicosComponent,
    NuevaVentaQuimicosComponent,
    MisVentasComponent,
    NuevaVentaComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    AutocompleteLibModule
  ]
})
export class VentasModule { }
