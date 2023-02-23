import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    },
    { 
        path: 'login', 
        component: LoginComponent,
        loadChildren: () => import('./login/login-routing.module').then( m => m.LoginRoutingModule )
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}