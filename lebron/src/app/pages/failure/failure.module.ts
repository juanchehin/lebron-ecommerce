import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailureRoutingModule } from './failure-routing.module';
import { FailureComponent } from './failure/failure.component';


@NgModule({
  declarations: [
    FailureComponent
  ],
  imports: [
    CommonModule,
    FailureRoutingModule
  ]
})
export class FailureModule { }
