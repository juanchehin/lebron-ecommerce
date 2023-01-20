import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { ChequearMailComponent } from './chequear-mail/chequear-mail.component';
import { LoginComponent } from './login/login.component';
import { MailComponent } from './mail/mail.component';
import { NuevaPassComponent } from './nueva-contraseña/nueva-pass.component';
import { PassRecuperadaComponent } from './pass-recuperada/pass-recuperada.component';
import { PerfilComponent } from './perfil/perfil/perfil.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChequearMailComponent,
    LoginComponent,
    MailComponent,
    NuevaPassComponent,
    PassRecuperadaComponent,
    RecuperarClaveComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CuentaModule { }
