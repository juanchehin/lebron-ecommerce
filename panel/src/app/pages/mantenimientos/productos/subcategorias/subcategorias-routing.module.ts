import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoriasComponent } from './subcategorias/subcategorias.component';
import { SubCategoriaComponent } from './subcategoria/subcategoria.component';
import { EditarSubcategoriaComponent } from './editar-subcategoria/editar-subcategoria.component';

const routes: Routes = [
  { path: '', component: SubCategoriasComponent, data: { titulo: 'Subcategorias' }},
  { path: 'nueva', component: SubCategoriaComponent, data: { titulo: 'Alta de subcategoria' }},
  { path: 'editar/:IdSubCategoria', component: EditarSubcategoriaComponent, data: { titulo: 'Edicion de subcategoria' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriasRoutingModule { }
