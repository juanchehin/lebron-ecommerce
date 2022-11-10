import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { AdminGuard } from '../services/guards/admin.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        // canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
          //
          // { path: '', component: PagesComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
