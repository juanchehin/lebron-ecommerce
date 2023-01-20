import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisDireccionesComponent } from './direcciones/mis-direcciones.component';
import { NuevaDireccionComponent } from './direcciones/nueva-direccion/nueva-direccion.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { MisPedidosComponent } from './pedidos/mis-pedidos.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: PerfilComponent },
  { path: 'cuenta/:IdPersona', component: MiCuentaComponent },
  { path: 'direcciones/:IdPersona', component: MisDireccionesComponent },
  { path: 'pedidos/:IdPersona', component: MisPedidosComponent },
  { path: 'direcciones/nueva/:IdPersona', component: NuevaDireccionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
