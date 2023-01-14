import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { NuevoGastoComponent } from './gastos/nuevo-gasto/nuevo-gasto.component';
import { ListarGastosComponent } from './gastos/listar-gastos/listar-gastos.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { NuevaCompraComponent } from './nueva-compra/nueva-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { RouterModule } from '@angular/router';
import { ComprasComponent } from './listar-compras/compras.component';


@NgModule({
  declarations: [
    ListarGastosComponent,
    NuevoGastoComponent,
    MisComprasComponent,
    NuevaCompraComponent,
    ComprasComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    RouterModule
  ]
})
export class ComprasModule { }
