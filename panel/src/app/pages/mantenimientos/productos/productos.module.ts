import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { RouterModule } from '@angular/router';

import { ProductoComponent } from './productos/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { EditarProductoComponent } from './productos/editar-producto.component';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcaComponent } from './marcas/marca.component';
import { EditarMarcaComponent } from './marcas/editar-marca.component';
import { SaboresComponent } from './sabores/sabores.component';
import { SaborComponent } from './sabores/sabor.component';
import { EditarSaborComponent } from './sabores/editar-sabor.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { UnidadComponent } from './unidades/unidad.component';
import { ImagenesProductoComponent } from './imagenes/imagenes-producto.component';
import { NuevaImagenProductoComponent } from './imagenes/nueva-imagen-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { EditarSubcategoriaComponent } from './subcategorias/editar-subcategoria/editar-subcategoria.component';
import { SubCategoriaComponent } from './subcategorias/subcategoria/subcategoria.component';
import { SubCategoriasComponent } from './subcategorias/subcategorias/subcategorias.component';
import { QuimicosModule } from './quimicos/quimicos.module';
import { PromocionComponent } from './promociones/promocion/promocion.component';
import { EditarPromocionComponent } from './promociones/editar-promocion/editar-promocion.component';
import { PromocionesComponent } from './promociones/listar-promocion/promociones.component';
import { EditarUnidadComponent } from './unidades/editar-unidad.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductosRoutingModule,
    RouterModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    QuimicosModule
  ],
  declarations: [
    ProductoComponent,
    ProductosComponent,
    EditarProductoComponent,
    //
    PromocionesComponent,
    PromocionComponent,
    EditarPromocionComponent,
    //
    MarcasComponent,
    MarcaComponent,
    EditarMarcaComponent,
    SaboresComponent,
    SaborComponent,
    EditarSaborComponent,
    //
    UnidadesComponent,
    UnidadComponent,
    EditarUnidadComponent,
    //
    ImagenesProductoComponent,
    NuevaImagenProductoComponent,
    //
    CategoriaComponent,
    CategoriasComponent,
    EditarCategoriaComponent,
    //
    SubCategoriasComponent,
    EditarSubcategoriaComponent,
    SubCategoriaComponent,
    //
    // QuimicosComponent
  ]
})
export class ProductosModule { }
