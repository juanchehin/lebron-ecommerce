import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { ComprarAhoraComponent } from './comprar-ahora/comprar-ahora.component';
import { DireccionEnvioComponent } from './direccion-envio/direccion-envio.component';
import { PagoExitosoComponent } from './pago-exitoso/pago-exitoso.component';

const routes: Routes = [  
  { path: 'checkout/direcciones/:IdPersona', component: DireccionEnvioComponent },
  { path: 'comprar-ahora/producto/:IdProducto', component: ComprarAhoraComponent },
  { path: 'comprar-ahora/promocion/:IdPromocion/:IdPersona', component: ComprarAhoraComponent },
  { path: 'carrito/:IdPersona', component: CarritoComponent },
  { path: 'pago-exitoso', component: PagoExitosoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
