import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasCorrientesRoutingModule } from './cuentas-corrientes-routing.module';
import { CuentaComponent } from './cuenta/cuenta.component';
import { EditarClienteCuentaComponent } from './editar-cliente-cuenta/editar-cliente-cuenta.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CuentaComponent,
    CuentasComponent,
    EditarClienteCuentaComponent,
    MovimientosComponent
  ],
  imports: [
    CommonModule,
    CuentasCorrientesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CuentasCorrientesModule { }
