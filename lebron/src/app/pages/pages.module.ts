import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { MapaComponent } from './mapa/mapa.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        PagesComponent
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
