import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { MarcasComponent } from './mantenimientos/marcas/marcas.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  // { path: 'usuarios', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

  // Mantenimientos
  { path: 'proveedores', component: ProveedoresComponent, data: { titulo: 'Proveedores' }},
  { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' }},
  { path: 'marcas', component: MarcasComponent, data: { titulo: 'Marcas' }},
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimiento de Medicos' }},
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' }},

  // Rutas de Admin
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } }
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
