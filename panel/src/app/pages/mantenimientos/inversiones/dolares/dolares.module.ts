import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DolaresRoutingModule } from './dolares-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoricoDolaresComponent } from './historico/historico-dolares.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
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
