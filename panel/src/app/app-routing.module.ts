import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: 'proveedores', loadChildren: () => import('./pages/mantenimientos/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
  { path: 'productos', loadChildren: () => import('./pages/mantenimientos/productos/productos.module').then(m => m.ProductosModule) },
  // { path: 'quimicos', loadChildren: () => import('./pages/mantenimientos/quimicos/quimicos.module').then(m => m.QuimicosModule) },

  { path: 'compras', loadChildren: () => import('./pages/mantenimientos/compras/compras.module').then(m => m.ComprasModule) },
  // { path: 'promociones', loadChildren: () => import('./pages/mantenimientos/promociones/promociones.module').then(m => m.PromocionesModule) },
  { path: 'ventas', loadChildren: () => import('./pages/mantenimientos/ventas/ventas.module').then(m => m.VentasModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/mantenimientos/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  // { path: 'cuentas-corrientes', loadChildren: () => import('./pages/mantenimientos/cuentas-corrientes/cuentas-corrientes.module').then(m => m.CuentasCorrientesModule) },
  { path: 'clientes', loadChildren: () => import('./pages/mantenimientos/clientes/clientes.module').then(m => m.ClientesModule) },
  // { path: 'inversores', loadChildren: () => import('./pages/mantenimientos/inversores/inversores.module').then(m => m.InversoresModule) },
  // { path: 'dolares', loadChildren: () => import('./pages/mantenimientos/dolares/dolares.module').then(m => m.DolaresModule) },
  // { path: 'backups', loadChildren: () => import('./pages/mantenimientos/backups/backups.module').then(m => m.BackupsModule) },

  { path: 'transferencias', loadChildren: () => import('./pages/mantenimientos/transferencias/transferencias.module').then(m => m.TransferenciasModule) },
  // { path: 'pedidos', loadChildren: () => import('./pages/mantenimientos/pedidos/pedidos.module').then(m => m.PedidosModule) },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
