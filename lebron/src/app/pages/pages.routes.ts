import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal/principal.component';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { PromocionDetalleComponent } from './promocion-detalle/promocion-detalle/promocion-detalle.component';
import { CarritoComponent } from './checkout/carrito/carrito.component';

const pagesRoutes: Routes = [
      // *** Acceso publico ****
      {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: PrincipalComponent },
            // { path: 'promociones', loadChildren: () => import('./principal/promociones/promociones.module').then(m => m.PromocionesModule) },
            { path: 'producto-detalle', loadChildren: () => import('./producto-detalle/producto-detalle.module').then(m => m.ProductoDetalleModule) },
            { path: 'marca/:IdMarca', loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasModule) },
            { path: 'categoria/:IdCategoria', component: CategoriasComponent },
            { path: 'promocion/:IdPromocion', component: PromocionDetalleComponent },
            { path: 'busqueda', loadChildren: () => import('./buscador/buscador.module').then(m => m.BuscadorModule) },
            { path: 'failure', loadChildren: () => import('./failure/failure.module').then(m => m.FailureModule) },
            { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule) },
            // { path: 'destacados', loadChildren: () => import('./principal/destacados/destacados.module').then(m => m.DestacadosModule) },
            { path: 'failure', loadChildren: () => import('./failure/failure.module').then(m => m.FailureModule) },
            { path: 'institucional', loadChildren: () => import('./institucional/institucional.module').then(m => m.InstitucionalModule) },
            { path: 'producto-detalle', loadChildren: () => import('./producto-detalle/producto-detalle.module').then(m => m.ProductoDetalleModule) },
            // { path: 'promociones', loadChildren: () => import('./principal/promociones/promociones.module').then(m => m.PromocionesModule) },
            { path: 'promociones', loadChildren: () => import('./productos-promocion/productos-promocion.module').then(m => m.ProductosPromocionModule) },
            { path: 'principal', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) },
            { path: 'productos-relacionados', loadChildren: () => import('./productos-relacionados/productos-relacionados.module').then(m => m.ProductosRelacionadosModule) },
            { path: 'promocion-detalle', loadChildren: () => import('./promocion-detalle/promocion-detalle.module').then(m => m.PromocionDetalleModule) }, 
            { path: 'marcas', loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasModule) }, 
        ]
    },
    // *** Acceso para el cliente logueado y con token actualizado ****
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        children: [
            { path: 'perfil', loadChildren: () => import('./cuenta/perfil/perfil.module').then(m => m.PerfilModule) },
            { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
            { path: 'perfil', loadChildren: () => import('./envio/envio.module').then(m => m.EnvioModule) },
            { path: 'mis-compras', loadChildren: () => import('./mis-compras/mis-compras.module').then(m => m.MisComprasModule) },
            { path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule) },
            { path: 'perfil', loadChildren: () => import('./cuenta/perfil/perfil.module').then(m => m.PerfilModule) },
            { path: 'mis-compras', loadChildren: () => import('./mis-compras/mis-compras.module').then(m => m.MisComprasModule) },
            { path: 'envio', loadChildren: () => import('./envio/envio.module').then(m => m.EnvioModule) },
            { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
            { path: 'carrito/:IdPersona', component: CarritoComponent },
        ]
    }
];



export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
