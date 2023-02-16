import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriasRoutingModule } from './subcategorias-routing.module';
import { SubCategoriasComponent } from './subcategorias/subcategorias.component';
import { SubCategoriaComponent } from './subcategoria/subcategoria.component';
import { EditarSubcategoriaComponent } from './editar-subcategoria/editar-subcategoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubCategoriasComponent,
    SubCategoriaComponent,
    EditarSubcategoriaComponent
  ],
  imports: [
    CommonModule,
    SubcategoriasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubcategoriasModule { }
