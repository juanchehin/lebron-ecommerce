import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { ComprarAhoraComponent } from './comprar-ahora/comprar-ahora.component';
import { DireccionEnvioComponent } from './direccion-envio/direccion-envio.component';
import { PagoExitosoComponent } from './pago-exitoso/pago-exitoso.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarritoComponent,
    ComprarAhoraComponent,
    DireccionEnvioComponent,
    PagoExitosoComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
