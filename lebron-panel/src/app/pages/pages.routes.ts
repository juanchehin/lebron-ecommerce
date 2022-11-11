import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { AdminGuard } from '../services/guards/admin.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
          //
          { path: 'dashboard', component: PagesComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'productos', component: ProductosComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
