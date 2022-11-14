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
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { SliderMarcasComponent } from './slider-marcas/slider-marcas.component';
import { ProductosPromocionComponent } from './productos-promocion/productos-promocion.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { BuscadorComponent } from './buscador/buscador.component';

@NgModule({
    declarations: [
        PagesComponent,
        CarouselComponent,
        PromocionesComponent,
        DestacadosComponent,
        OfertasComponent,
        LoginComponent,
        PrincipalComponent,
        SliderMarcasComponent,
        ProductosPromocionComponent,
        CategoriasComponent,
        BuscadorComponent
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
