import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MapaComponent } from './pages/mapa/mapa.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  { path: '', component: PagesComponent },
  // Visible al usuario

  { path: '**', component: PagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );

