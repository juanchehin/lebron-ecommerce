import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const routes: Routes = [
  // { path: 'productos-relacionados', loadChildren: () => import('./pages/productos-relacionados/productos-relacionados.module').then(m => m.ProductosRelacionadosModule) },
  // { path: 'promocion-detalle', loadChildren: () => import('./pages/promocion-detalle/promocion-detalle.module').then(m => m.PromocionDetalleModule) },  
  // { path: 'login', component: LoginComponent },
  // Visible al usuario
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );

