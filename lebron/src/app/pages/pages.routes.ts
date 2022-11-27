import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cuenta/login/login.component';
import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RegisterComponent } from './cuenta/register/register.component';
import { PerfilComponent } from './cuenta/perfil/perfil.component';
import { MiCuentaComponent } from './cuenta/perfil/mi-cuenta/mi-cuenta.component';
import { MisDireccionesComponent } from './cuenta/perfil/direcciones/mis-direcciones.component';
import { MisPedidosComponent } from './cuenta/perfil/pedidos/mis-pedidos.component';
import { MailComponent } from './cuenta/mail/mail.component';
import { TerminosCondicionesComponent } from './institucional/terminos-condiciones/terminos-condiciones.component';
import { ContactoComponent } from './institucional/contacto/contacto.component';
import { FranquiciaComponent } from './institucional/franquicia/franquicia.component';
import { PoliticasComponent } from './institucional/politicas-seguridad/politicas-seguridad.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EnvioComponent } from './envio/envio.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { DireccionEnvioComponent } from './checkout/direccion-envio/direccion-envio.component';
import { NuevaDireccionComponent } from './cuenta/perfil/direcciones/nueva-direccion/nueva-direccion.component';
import { FailureComponent } from './failure/failure.component';
import { ComprarAhoraComponent } from './checkout/comprar-ahora/comprar-ahora.component';

const pagesRoutes: Routes = [
      // *** Acceso publico ****
      {
        path: '',
        component: PagesComponent,
        // canActivate: [LoginGuardGuard, VerificaTokenGuard],
        children: [
            { path: '', component: PrincipalComponent },
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegisterComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'perfil/direcciones/nueva/:IdPersona', component: NuevaDireccionComponent }, // proteger ruta
            { path: 'carrito/:IdPersona', component: CarritoComponent },
            { path: 'envio/:IdPersona', component: EnvioComponent },
            { path: 'cuenta-creada', component: MailComponent },
            { path: 'promociones', component: ProductosPromocionComponent },
            { path: 'producto/detalle/:IdProducto', component: ProductoDetalleComponent },
            { path: 'categoria/:IdCategoria', component: CategoriasComponent },
            { path: 'busqueda/:productoBuscado', component: BuscadorComponent },
            { path: 'terminos-y-condiciones', component: TerminosCondicionesComponent },
            { path: 'contacto', component: ContactoComponent },
            { path: 'franquicia', component: FranquiciaComponent },
            { path: 'politicas-de-seguridad', component: PoliticasComponent },
            { path: 'failure', component: FailureComponent },
            { path: 'checkout/direcciones/:IdPersona', component: DireccionEnvioComponent },    // proteger ruta
            { path: 'comprar-ahora/:IdProducto/:IdPersona', component: ComprarAhoraComponent },    // proteger ruta
            // Choferes
            // { path: 'choferes', component: ChoferesComponent },
            // { path: 'choferes/nuevo', component: NuevoChoferComponent },
            // Usuarios
            // { path: 'choferes', component: ChoferesComponent },
            // { path: 'choferes/nuevo', component: NuevoChoferComponent }
        ]
    },
    // *** Acceso para el cliente logueado y con token actualizado ****
    {
        path: '',
        component: PagesComponent,
        // canActivate: [LoginGuardGuard, VerificaTokenGuard],
        children: [
            { path: 'perfil', component: PerfilComponent },
            { path: 'perfil/cuenta/:IdPersona', component: MiCuentaComponent },
            { path: 'perfil/direcciones/:IdPersona', component: MisDireccionesComponent },
            { path: 'perfil/pedidos/:IdPersona', component: MisPedidosComponent },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
