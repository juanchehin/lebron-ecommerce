import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClientesService } from './clientes.service';
import { VerificaTokenGuard } from './guards/verifica-token.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { UsuariosService } from './usuarios.service';
import { MarcasService } from './marcas.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ClientesService,
    MarcasService,
    UsuariosService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
