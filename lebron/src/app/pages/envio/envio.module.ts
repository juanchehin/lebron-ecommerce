import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvioRoutingModule } from './envio-routing.module';
import { EnvioComponent } from './envio/envio.component';


@NgModule({
  declarations: [
    EnvioComponent
  ],
  imports: [
    CommonModule,
    EnvioRoutingModule
  ]
})
export class EnvioModule { }
