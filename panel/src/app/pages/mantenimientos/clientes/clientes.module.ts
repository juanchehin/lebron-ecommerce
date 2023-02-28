import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CuentaComponent } from './cuentas-corrientes/cuenta/cuenta.component';
import { MovimientosComponent } from './cuentas-corrientes/movimientos/movimientos.component';
import { CuentasComponent } from './cuentas-corrientes/cuentas/cuentas.component';
import { EditarClienteCuentaComponent } from './cuentas-corrientes/editar-cliente-cuenta/editar-cliente-cuenta.component';


@NgModule({
  declarations: [
    ClientesComponent,
    ClienteComponent,
    EditarClienteComponent,
    CuentaComponent,
    MovimientosComponent,
    CuentasComponent,
    EditarClienteCuentaComponent,
    CuentaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule
    // CuentaComponent,
    // MovimientosComponent,
    // CuentasComponent,
    // EditarClienteCuentaComponent,
    // CuentaComponent
  ]
})
export class ClientesModule { }
