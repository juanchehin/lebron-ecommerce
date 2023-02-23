import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones.component';
import { PromocionesModule } from './mantenimientos/promociones/promociones.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ConfiguracionesComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ConfiguracionesComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    PromocionesModule
  ]
})
export class PagesModule { }
