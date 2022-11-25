import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
// import { AdminGuard } from '../guards/admin.guard.ts.old';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { MarcasComponent } from './mantenimientos/marcas/marcas.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { UnidadesComponent } from './mantenimientos/productos/unidades/unidades.component';
import { UnidadComponent } from './mantenimientos/productos/unidades/unidad.component';
import { NuevaVentaComponent } from './mantenimientos/ventas/nueva-venta/nueva-venta.component';
import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

  // Mantenimientos
  { path: 'proveedores', component: ProveedoresComponent, data: { titulo: 'Proveedores' }},
  { path: 'configuraciones', component: ConfiguracionesComponent, data: { titulo: 'Configuraciones' }},
  { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' }},
  { path: 'productos/nuevo', component: ProductoComponent, data: { titulo: 'Nuevo Producto' }},
  { path: 'productos/unidades', component: UnidadesComponent, data: { titulo: 'Unidades' }},
  { path: 'productos/unidades/nuevo', component: UnidadComponent, data: { titulo: 'Nueva Unidad' }},
  { path: 'productos/marcas', component: MarcasComponent, data: { titulo: 'Marcas' }},
  { path: 'venta/nueva', component: NuevaVentaComponent, data: { titulo: 'Nueva venta' }},

  // Rutas de Admin
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
  { path: 'usuarios/nuevo', component: UsuarioComponent, data: { titulo: 'Alta de Usuario' } }
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
