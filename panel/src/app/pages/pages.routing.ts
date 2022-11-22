import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { AuthGuard } from '../guards/auth.guard.ts';

import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../guards/login-guard.guard';
// import { AdminGuard } from '../guards/admin.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';




const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        // canLoad: [ AuthGuard ],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


