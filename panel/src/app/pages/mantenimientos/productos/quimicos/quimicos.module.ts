import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuimicosRoutingModule } from './quimicos-routing.module';
import { RouterModule } from '@angular/router';
import { QuimicoComponent } from './quimicos/quimico.component';
import { QuimicosComponent } from './quimicos/quimicos.component';
import { EditarQuimicoComponent } from './quimicos/editar-quimico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    QuimicosRoutingModule,
    RouterModule,
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  declarations: [
    QuimicoComponent,
    QuimicosComponent,
    EditarQuimicoComponent
  ]
})
export class QuimicosModule { }
