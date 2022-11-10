import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
    declarations: [
        PagesComponent,
        UsuariosComponent
        // MapaComponent,
        // ChoferesComponent,
        // NuevoChoferComponent
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
