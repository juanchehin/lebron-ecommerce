import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InversorComponent } from './inversor/inversor.component';
import { InversoresComponent } from './inversores/inversores.component';
import { EditarInversorComponent } from './editar-inversor/editar-inversor.component';
import { InversoresRoutingModule } from './inversores-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoricoInversorComponent } from './historico-inversor/historico-inversor.component';


@NgModule({
  declarations: [
    InversoresComponent,
    InversorComponent,
    EditarInversorComponent,
    HistoricoInversorComponent
  ],
  imports: [
    CommonModule,
    InversoresRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class InversoresModule { }