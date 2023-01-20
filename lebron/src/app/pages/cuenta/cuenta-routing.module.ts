import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequearMailComponent } from './chequear-mail/chequear-mail.component';
import { NuevaPassComponent } from './nueva-contraseña/nueva-pass.component';
import { PassRecuperadaComponent } from './pass-recuperada/pass-recuperada.component';
import { ActualizacionExitosaComponent } from './perfil/actualizacion-exitosa/actualizacion-exitosa.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { LoginComponent } from './login/login.component';
import { MailComponent } from './mail/mail.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'nueva-pass/:pToken', component: NuevaPassComponent },
  { path: 'recuperar-clave', component: RecuperarClaveComponent },
  { path: 'chequear-mail', component: ChequearMailComponent },
  { path: 'pass-recuperada', component: PassRecuperadaComponent },
  { path: 'actualizacion-cuenta', component: ActualizacionExitosaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'cuenta-creada', component: MailComponent },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
