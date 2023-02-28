import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
// import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    LoginModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
