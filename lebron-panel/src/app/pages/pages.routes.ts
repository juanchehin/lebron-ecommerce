import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
// import { MapaComponent } from './mapa/mapa.component';
// import { ChoferesComponent } from './choferes/choferes.component';
// import { NuevoChoferComponent } from './choferes/nuevo-chofer.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { AdminGuard } from '../services/guards/admin.guard';

const pagesRoutes: Routes = [
    {
        path: 'test',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
          //
          // { path: '', component: PagesComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
