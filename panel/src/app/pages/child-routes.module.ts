import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// Mantenimientos
import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones.component';
import { PedidosComponent } from './mantenimientos/pedidos/pedidos/pedidos.component';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { 
    path: 'productos',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/productos/productos-routing.module').then( m => m.ProductosRoutingModule )
  },
  { 
    path: 'quimicos',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/quimicos/quimicos-routing.module').then( m => m.QuimicosRoutingModule )
  },
  { 
    path: 'usuarios',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/usuarios/usuarios-routing.module').then( m => m.UsuariosRoutingModule )
  },
  { 
    path: 'proveedores',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/proveedores/proveedores-routing.module').then( m => m.ProveedoresRoutingModule )
  },
  { 
    path: 'compras',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/compras/compras-routing.module').then( m => m.ComprasRoutingModule )
  },
  { 
    path: 'ventas',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/ventas/ventas-routing.module').then( m => m.VentasRoutingModule )
  },
  { 
    path: 'promociones',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/promociones/promociones-routing.module').then( m => m.PromocionesRoutingModule )
  },
  { 
    path: 'clientes',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/clientes/clientes-routing.module').then( m => m.ClientesRoutingModule )
  },
  { 
    path: 'cuentas',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/cuentas-corrientes/cuentas-corrientes-routing.module').then( m => m.CuentasCorrientesRoutingModule )
  },
  { 
    path: 'transferencias',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/transferencias/transferencias-routing.module').then( m => m.TransferenciasRoutingModule )
  },
  { 
    path: 'inversores',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/inversores/inversores-routing.module').then( m => m.InversoresRoutingModule )
  },
  { 
    path: 'dolares',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/dolares/dolares-routing.module').then( m => m.DolaresRoutingModule )
  },
  { path: 'configuraciones', component: ConfiguracionesComponent, data: { titulo: 'Configuraciones' }},
  { path: 'pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' }}
  
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
