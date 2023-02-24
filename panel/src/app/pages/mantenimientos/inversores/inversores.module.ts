import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InversorComponent } from './inversor/inversor.component';
import { InversoresComponent } from './inversores/inversores.component';
import { EditarInversorComponent } from './editar-inversor/editar-inversor.component';
import { InversoresRoutingModule } from './inversores-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoricoInversorComponent } from './historico-inversor/historico-inversor.component';
import { AltaMontoInversionComponent } from './alta-monto/alta-monto.component';
import { BajaMontoInversionComponent } from './baja-monto/baja-monto.component';


@NgModule({
  declarations: [
    InversoresComponent,
    InversorComponent,
    EditarInversorComponent,
    HistoricoInversorComponent,
    AltaMontoInversionComponent,
    BajaMontoInversionComponent
  ],
  imports: [
    CommonModule,
    InversoresRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class InversoresModule { }
