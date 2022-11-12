import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';
// import { MapaComponent } from './mapa/mapa.component';
// import { ChoferesComponent } from './choferes/choferes.component';
// import { NuevoChoferComponent } from './choferes/nuevo-chofer.component';

const pagesRoutes: Routes = [
      // *** Acceso publico ****
      {
        path: '',
        component: PagesComponent,
        // canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
            { path: '', component: PrincipalComponent },
            { path: 'login', component: LoginComponent },
            { path: 'promociones', component: ProductosPromocionComponent }
            // Choferes
            // { path: 'choferes', component: ChoferesComponent },
            // { path: 'choferes/nuevo', component: NuevoChoferComponent },
            // Usuarios
            // { path: 'choferes', component: ChoferesComponent },
            // { path: 'choferes/nuevo', component: NuevoChoferComponent }
        ]
    },
    // *** Acceso para el perfil ****
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
