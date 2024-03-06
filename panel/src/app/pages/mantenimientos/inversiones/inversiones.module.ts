import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditarInversorComponent } from './inversores/editar-inversor/editar-inversor.component';
import { HistoricoInversorComponent } from './inversores/historico-inversor/historico-inversor.component';
import { InversoresComponent } from './inversores/inversores/inversores.component';
import { InversionesRoutingModule } from './inversiones-routing.module';
import { DolaresModule } from './dolares/dolares.module';
import { InversoresPrincipalComponent } from './principal/inversores-principal.component';


@NgModule({
  declarations: [
    InversoresComponent,
    EditarInversorComponent,
    HistoricoInversorComponent,
    InversoresPrincipalComponent
  ],
  imports: [
    CommonModule,
    InversionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DolaresModule
  ]
})
export class InversionesModule { }
