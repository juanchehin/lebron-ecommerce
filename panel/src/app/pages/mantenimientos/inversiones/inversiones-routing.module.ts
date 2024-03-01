import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from 'src/app/guards/login-guard.guard';
import { VerificaTokenGuard } from 'src/app/guards/verifica-token.guard';
import { EditarInversorComponent } from './inversores/editar-inversor/editar-inversor.component';
import { HistoricoInversorComponent } from './inversores/historico-inversor/historico-inversor.component';
import { InversorComponent } from './inversores/inversor/inversor.component';
import { InversoresComponent } from './inversores/inversores/inversores.component';
import { InversoresPrincipalComponent } from './principal/inversores-principal.component';

const routes: Routes = [
  { path: '', component: InversoresPrincipalComponent, data: { titulo: 'Inversiones' }},
  { path: 'inversores', component: InversoresComponent, data: { titulo: 'Listado de inversores' }},
  { path: 'nuevo', component: InversorComponent, data: { titulo: 'Nuevo inversor' }},
  { path: 'editar/:IdPersona', component: EditarInversorComponent, data: { titulo: 'Edicion de inversor' }},
  { path: 'inversores/historico/:IdPersona', component: HistoricoInversorComponent, data: { titulo: 'Historial de inversiones' }},
  //
  // Compra/Venta dolares
  { 
    path: 'dolares',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./dolares/dolares-routing.module').then( m => m.DolaresRoutingModule )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InversionesRoutingModule { }
