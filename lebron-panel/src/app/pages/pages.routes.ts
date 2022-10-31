import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
// import { MapaComponent } from './mapa/mapa.component';
// import { ChoferesComponent } from './choferes/choferes.component';
// import { NuevoChoferComponent } from './choferes/nuevo-chofer.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        // canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
            // { path: 'mapa', component: MapaComponent },
            // Choferes
            // { path: 'choferes', component: ChoferesComponent },
            // { path: 'choferes/nuevo', component: NuevoChoferComponent },
// Usuarios
// { path: 'choferes', component: ChoferesComponent },
// { path: 'choferes/nuevo', component: NuevoChoferComponent }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
