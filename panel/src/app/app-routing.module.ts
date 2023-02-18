import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'proveedores', loadChildren: () => import('./pages/mantenimientos/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
  { path: 'productos', loadChildren: () => import('./pages/mantenimientos/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'compras', loadChildren: () => import('./pages/mantenimientos/compras/compras.module').then(m => m.ComprasModule) },
  { path: 'compras', loadChildren: () => import('./pages/mantenimientos/compras/compras.module').then(m => m.ComprasModule) },
  { path: 'promociones', loadChildren: () => import('./pages/mantenimientos/promociones/promociones.module').then(m => m.PromocionesModule) },
  { path: 'ventas', loadChildren: () => import('./pages/mantenimientos/ventas/ventas.module').then(m => m.VentasModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/mantenimientos/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'cuentas-corrientes', loadChildren: () => import('./pages/mantenimientos/cuentas-corrientes/cuentas-corrientes.module').then(m => m.CuentasCorrientesModule) },
  { path: 'clientes', loadChildren: () => import('./pages/mantenimientos/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'inversores', loadChildren: () => import('./pages/mantenimientos/inversores/inversores.module').then(m => m.InversoresModule) },

  { path: 'transferencias', loadChildren: () => import('./pages/mantenimientos/transferencias/transferencias.module').then(m => m.TransferenciasModule) },
  { path: 'pedidos', loadChildren: () => import('./pages/mantenimientos/pedidos/pedidos.module').then(m => m.PedidosModule) },
  { path: '**', component: NopagefoundComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
