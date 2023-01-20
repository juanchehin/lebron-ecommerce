import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClientesService } from './clientes.service';
import { UsuariosService } from './usuarios.service';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { AdminGuard } from '../guards/admin.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ClientesService,
    UsuariosService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
