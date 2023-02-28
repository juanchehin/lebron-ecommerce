import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupsRoutingModule } from './backups-routing.module';
import { RouterModule } from '@angular/router';
import { BackupsComponent } from './backups/backups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BackupsRoutingModule,
    RouterModule,
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  declarations: [
    BackupsComponent
  ]
})
export class BackupsModule { }
