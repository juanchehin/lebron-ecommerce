import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BackupsComponent } from './backups/backups/backups.component';
import { ConfiguracionesEmpresaComponent } from './configuraciones-empresa/configuraciones-empresa.component';
import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';


@NgModule({
  declarations: [
    BackupsComponent,
    ConfiguracionesEmpresaComponent,
    ConfiguracionesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ConfiguracionesModule { }
