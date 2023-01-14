import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  { path: '', component: CategoriasComponent, data: { titulo: 'Categorias' }},
  { path: 'nueva', component: CategoriaComponent, data: { titulo: 'Nueva categoria' }},
  { path: 'editar/:IdCliente', component: EditarCategoriaComponent, data: { titulo: 'Editar categoria' }}
 ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
