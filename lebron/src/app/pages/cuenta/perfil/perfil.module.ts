import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { RouterModule } from '@angular/router';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisDireccionesComponent } from './direcciones/mis-direcciones.component';
import { NuevaDireccionComponent } from './direcciones/nueva-direccion/nueva-direccion.component';
import { MisPedidosComponent } from './pedidos/mis-pedidos.component';


@NgModule({
  declarations: [
    PerfilComponent,
    MisPedidosComponent,
    MiCuentaComponent,
    MisDireccionesComponent,
    NuevaDireccionComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
