import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { MapaComponent } from './mapa/mapa.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { DestacadosComponent } from './destacados/destacados.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { LoginComponent } from './cuenta/login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { SliderMarcasComponent } from './slider-marcas/slider-marcas.component';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RegisterComponent } from './cuenta/register/register.component';
import { MiCuentaComponent } from './cuenta/perfil/mi-cuenta/mi-cuenta.component';
import { MisPedidosComponent } from './cuenta/perfil/pedidos/mis-pedidos.component';
import { MisDireccionesComponent } from './cuenta/perfil/direcciones/mis-direcciones.component';
import { PerfilComponent } from './cuenta/perfil/perfil.component';
import { TerminosCondicionesComponent } from './institucional/terminos-condiciones/terminos-condiciones.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EnvioComponent } from './envio/envio.component';
import { ProductosRelacionadosComponent } from './productos-relacionados/productos-relacionados.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { DireccionEnvioComponent } from './checkout/direccion-envio/direccion-envio.component';
import { NuevaDireccionComponent } from './cuenta/perfil/direcciones/nueva-direccion/nueva-direccion.component';
import { FailureComponent } from './failure/failure.component';
import { ComprarAhoraComponent } from './checkout/comprar-ahora/comprar-ahora.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';

@NgModule({
    declarations: [
        PagesComponent,
        CarouselComponent,
        PromocionesComponent,
        DestacadosComponent,
        OfertasComponent,
        LoginComponent,
        RegisterComponent,
        PrincipalComponent,
        SliderMarcasComponent,
        ProductosPromocionComponent,
        CategoriasComponent,
        BuscadorComponent,
        MiCuentaComponent,
        MisPedidosComponent,
        MisDireccionesComponent,
        PerfilComponent,
        TerminosCondicionesComponent,
        CarritoComponent,
        EnvioComponent,
        ProductosRelacionadosComponent,
        ProductoDetalleComponent,
        DireccionEnvioComponent,
        NuevaDireccionComponent,
        FailureComponent,
        ComprarAhoraComponent,
        MisComprasComponent
        // CheckoutComponent
    ],
    exports: [
        PagesComponent
    ],
    imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
    ]
})

export class PagesModule { }
