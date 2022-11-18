import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cuenta/login/login.component';
import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RegisterComponent } from './cuenta/register/register.component';
import { PerfilComponent } from './cuenta/perfil/perfil.component';

const pagesRoutes: Routes = [
      // *** Acceso publico ****
      {
        path: '',
        component: PagesComponent,
        // canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
            { path: '', component: PrincipalComponent },
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegisterComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'promociones', component: ProductosPromocionComponent },
            { path: 'categoria/:IdCategoria', component: CategoriasComponent },
            { path: 'busqueda/:productoBuscado', component: BuscadorComponent }
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
