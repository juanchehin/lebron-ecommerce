import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
  { path: 'nuevo', component: UsuarioComponent, data: { titulo: 'Alta de usuario' }},
  { path: 'editar/:IdUsuario', component: EditarUsuarioComponent, data: { titulo: 'Edicion de usuario' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
