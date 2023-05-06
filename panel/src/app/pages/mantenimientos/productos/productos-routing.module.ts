import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ImagenesProductoComponent } from './imagenes/imagenes-producto.component';
import { NuevaImagenProductoComponent } from './imagenes/nueva-imagen-producto.component';
import { EditarMarcaComponent } from './marcas/editar-marca.component';
import { MarcaComponent } from './marcas/marca.component';
import { MarcasComponent } from './marcas/marcas.component';
import { EditarProductoComponent } from './productos/editar-producto.component';
import { ProductoComponent } from './productos/producto.component';
import { EditarSaborComponent } from './sabores/editar-sabor.component';
import { SaborComponent } from './sabores/sabor.component';
import { SaboresComponent } from './sabores/sabores.component';
import { UnidadComponent } from './unidades/unidad.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { SubCategoriasComponent } from './subcategorias/subcategorias/subcategorias.component';
import { SubCategoriaComponent } from './subcategorias/subcategoria/subcategoria.component';
import { EditarSubcategoriaComponent } from './subcategorias/editar-subcategoria/editar-subcategoria.component';
import { LoginGuardGuard } from 'src/app/guards/login-guard.guard';
import { VerificaTokenGuard } from 'src/app/guards/verifica-token.guard';
import { PromocionesComponent } from './promociones/listar-promocion/promociones.component';
import { PromocionComponent } from './promociones/promocion/promocion.component';
import { EditarUnidadComponent } from './unidades/editar-unidad.component';


const routes: Routes = [
   // Productos
   { path: '', component: ProductosComponent, data: { titulo: 'Productos' }},
   { path: 'nuevo', component: ProductoComponent, data: { titulo: 'Nuevo Producto' }},
   { path: 'editar/:IdProducto', component: EditarProductoComponent, data: { titulo: 'Edicion de producto' }},
   // Unidades
   { path: 'unidades', component: UnidadesComponent, data: { titulo: 'Unidades' }},
   { path: 'unidades/nuevo', component: UnidadComponent, data: { titulo: 'Nueva Unidad' }},
   { path: 'unidades/:IdUnidad', component: EditarUnidadComponent, data: { titulo: 'Editar unidad' }},
   // Imagenes
   { path: 'imagenes/:IdProducto', component: ImagenesProductoComponent, data: { titulo: 'Imagenes' }},
   { path: 'imagenes/nueva/:IdProducto', component: NuevaImagenProductoComponent, data: { titulo: 'Nueva Imagen' }},
   // Productos - marcas
   { path: 'marcas', component: MarcasComponent, data: { titulo: 'Marcas' }},
   { path: 'marcas/nueva', component: MarcaComponent, data: { titulo: 'Nueva Marca' }},
   { path: 'marca/:IdMarca', component: EditarMarcaComponent, data: { titulo: 'Editar Marca' }},
   // Productos - sabores
   { path: 'sabor/:IdSabor', component: EditarSaborComponent, data: { titulo: 'Editar Sabor' }},
   { path: 'sabores', component: SaboresComponent, data: { titulo: 'Sabores' }},
   { path: 'sabores/nueva', component: SaborComponent, data: { titulo: 'Nueva Sabor' }},
   // Productos - categorias
   { path: 'categorias', component: CategoriasComponent, data: { titulo: 'Categorias' }},
   { path: 'categorias/nueva', component: CategoriaComponent, data: { titulo: 'Nueva Categoria' }},
   { path: 'categoria/:IdCategoria', component: EditarCategoriaComponent, data: { titulo: 'Editar Categoria' }},
   // Productos - subcategorias
   { path: 'subcategorias', component: SubCategoriasComponent, data: { titulo: 'Categorias' }},
   { path: 'subcategorias/nueva', component: SubCategoriaComponent, data: { titulo: 'Nueva SubCategoria' }},
   { path: 'subcategoria/:IdSubCategoria', component: EditarSubcategoriaComponent, data: { titulo: 'Editar Categoria' }},
   // Promociones
   { path: 'promociones', component: PromocionesComponent, data: { titulo: 'Promociones' }},
   { path: 'promocion/nueva', component: PromocionComponent, data: { titulo: 'Nueva Promocion' }},
   { 
     path: 'quimicos',
     canActivate: [LoginGuardGuard, VerificaTokenGuard],
     loadChildren: () => import('./quimicos/quimicos-routing.module').then( m => m.QuimicosRoutingModule )
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
