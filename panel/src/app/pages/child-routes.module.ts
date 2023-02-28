import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
// Mantenimientos
// import { PedidosComponent } from './mantenimientos/pedidos/pedidos/pedidos.component';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';
import { VerificaPermisoGuard } from '../guards/verifica-permiso.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { 
    path: 'productos',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Productos'},
    loadChildren: () => import('./mantenimientos/productos/productos-routing.module').then( m => m.ProductosRoutingModule )
  },
  { 
    path: 'usuarios',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Usuarios'},
    loadChildren: () => import('./mantenimientos/usuarios/usuarios-routing.module').then( m => m.UsuariosRoutingModule )
  },
  { 
    path: 'proveedores',
    canActivate: [LoginGuardGuard, VerificaTokenGuard,VerificaPermisoGuard],
    data: { ruta: 'Proveedores'},
    loadChildren: () => import('./mantenimientos/proveedores/proveedores-routing.module').then( m => m.ProveedoresRoutingModule )
  },
  { 
    path: 'compras',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Compras'},
    loadChildren: () => import('./mantenimientos/compras/compras-routing.module').then( m => m.ComprasRoutingModule )
  },
  { 
    path: 'ventas',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Ventas'},
    loadChildren: () => import('./mantenimientos/ventas/ventas-routing.module').then( m => m.VentasRoutingModule )
  },
  { 
    path: 'clientes',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/clientes/clientes-routing.module').then( m => m.ClientesRoutingModule )
  },
  { 
    path: 'transferencias',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Transferencias'},
    loadChildren: () => import('./mantenimientos/transferencias/transferencias-routing.module').then( m => m.TransferenciasRoutingModule )
  },
  { 
    path: 'inversiones',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Inversores'},
    loadChildren: () => import('./mantenimientos/inversiones/inversiones-routing.module').then( m => m.InversionesRoutingModule )
  },
  { 
    path: 'configuraciones',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'Configuraciones'},
    loadChildren: () => import('./mantenimientos/configuraciones/configuraciones-routing.module').then( m => m.ConfiguracionesRoutingModule )
  }
 
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
