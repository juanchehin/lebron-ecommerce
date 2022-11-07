import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './shared/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Visible al usuario
  { path: '**', component: PagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );

