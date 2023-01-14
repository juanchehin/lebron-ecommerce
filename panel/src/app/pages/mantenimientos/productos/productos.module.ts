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

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductosRoutingModule,
    RouterModule,
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductoComponent,
    ProductosComponent,
    EditarProductoComponent,
    MarcasComponent,
    MarcaComponent,
    EditarMarcaComponent,
    SaboresComponent,
    SaborComponent,
    EditarSaborComponent,
    UnidadesComponent,
    UnidadComponent,
    ImagenesProductoComponent,
    NuevaImagenProductoComponent
  ]
})
export class ProductosModule { }
