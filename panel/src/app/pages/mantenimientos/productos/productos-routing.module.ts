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


const routes: Routes = [
   // Productos
   { path: '', component: ProductosComponent, data: { titulo: 'Productos' }},
   { path: 'nuevo', component: ProductoComponent, data: { titulo: 'Nuevo Producto' }},
   { path: ':IdProducto', component: EditarProductoComponent, data: { titulo: 'Edicion de producto' }},
   { path: 'unidades', component: UnidadesComponent, data: { titulo: 'Unidades' }},
   { path: 'unidades/nuevo', component: UnidadComponent, data: { titulo: 'Nueva Unidad' }},
   { path: 'sabor/:IdSabor', component: EditarSaborComponent, data: { titulo: 'Editar Sabor' }},
   // Imagenes
   { path: 'imagenes/:IdProducto', component: ImagenesProductoComponent, data: { titulo: 'Imagenes' }},
   { path: 'imagenes/nueva/:IdProducto', component: NuevaImagenProductoComponent, data: { titulo: 'Nueva Imagen' }},
   // Productos - marcas
   { path: 'marcas', component: MarcasComponent, data: { titulo: 'Marcas' }},
   { path: 'marcas/nueva', component: MarcaComponent, data: { titulo: 'Nueva Marca' }},
   { path: 'marca/:IdMarca', component: EditarMarcaComponent, data: { titulo: 'Editar Marca' }},
   // Productos - sabores
   { path: 'sabores', component: SaboresComponent, data: { titulo: 'Sabores' }},
   { path: 'sabores/nueva', component: SaborComponent, data: { titulo: 'Nueva Sabor' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
