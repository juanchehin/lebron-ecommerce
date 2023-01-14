import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionesRoutingModule } from './promociones-routing.module';
import { EditarPromocionComponent } from './editar-promocion/editar-promocion.component';
import { PromocionComponent } from './promocion/promocion.component';
import { PromocionesComponent } from './listar-promocion/promociones.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PromocionesComponent,
    EditarPromocionComponent,
    PromocionComponent
  ],
  imports: [
    CommonModule,
    PromocionesRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PromocionesModule { }
