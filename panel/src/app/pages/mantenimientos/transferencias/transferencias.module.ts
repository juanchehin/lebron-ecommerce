import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferenciasRoutingModule } from './transferencias-routing.module';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    TransferenciasComponent,
    TransferenciaComponent
  ],
  imports: [
    CommonModule,
    TransferenciasRoutingModule,
    FormsModule,
    AutocompleteLibModule
  ]
})
export class TransferenciasModule { }
