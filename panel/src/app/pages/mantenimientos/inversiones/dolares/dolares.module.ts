import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DolaresRoutingModule } from './dolares-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VentaDolarComponent } from './vender-dolar/venta-dolar.component';
import { HistoricoDolaresComponent } from './historico/historico-dolares.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CompraDolarComponent } from './compra-dolar/compra-dolar.component';

@NgModule({
  declarations: [
    VentaDolarComponent,
    CompraDolarComponent,
    HistoricoDolaresComponent
  ],
  imports: [
    AutocompleteLibModule,
    CommonModule,
    FormsModule,
    DolaresRoutingModule,
    ReactiveFormsModule
  ]
})
export class DolaresModule { }
