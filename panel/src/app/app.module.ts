import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { NgbdModalBasic } from './pages/mantenimientos/ventas/nueva-venta/modal-forma-pago/modal-forma-pago.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  providers: [NgbdModalBasic],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
