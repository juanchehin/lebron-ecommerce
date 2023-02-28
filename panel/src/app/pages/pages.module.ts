import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones-empresa/configuraciones.component';
import { InversionesModule } from './mantenimientos/inversiones/inversiones.module';

@NgModule({
  declarations: [
    PagesComponent,
    ConfiguracionesComponent
  ],
  exports: [
    PagesComponent,
    ConfiguracionesComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    InversionesModule
  ]
})
export class PagesModule { }
