import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { MarcasComponent } from './mantenimientos/marcas/marcas.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { UnidadesComponent } from './mantenimientos/productos/unidades/unidades.component';
import { UnidadComponent } from './mantenimientos/productos/unidades/unidad.component';
import { NuevaVentaComponent } from './mantenimientos/ventas/nueva-venta/nueva-venta.component';
import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones.component';
import { ImagenesProductoComponent } from './mantenimientos/productos/imagenes/imagenes-producto.component';
import { NuevaImagenProductoComponent } from './mantenimientos/productos/imagenes/nueva-imagen-producto.component';
import { PedidosComponent } from './mantenimientos/pedidos/pedidos.component';
import { PromocionesComponent } from './mantenimientos/promociones/promociones.component';
import { PromocionComponent } from './mantenimientos/promociones/promocion.component';
import { MisVentasComponent } from './mantenimientos/ventas/mis-ventas/mis-ventas.component';
import { NuevaCompraComponent } from './mantenimientos/compras/nueva-compra/nueva-compra.component';
import { MisComprasComponent } from './mantenimientos/compras/mis-compras/mis-compras.component';
import { ComprasComponent } from './mantenimientos/compras/listar-compras/compras.component';
import { ProveedorComponent } from './mantenimientos/proveedores/proveedor.component';
import { EditarProductoComponent } from './mantenimientos/productos/editar-producto.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  // Mantenimientos
  { path: 'proveedores', component: ProveedoresComponent, data: { titulo: 'Proveedores' }},
  { path: 'proveedores/nuevo', component: ProveedorComponent, data: { titulo: 'Alta de proveedor' }},

  { path: 'configuraciones', component: ConfiguracionesComponent, data: { titulo: 'Configuraciones' }},
  { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' }},
  { path: 'productos/nuevo', component: ProductoComponent, data: { titulo: 'Nuevo Producto' }},
  { path: 'producto/:IdProducto', component: EditarProductoComponent, data: { titulo: 'Edicion de producto' }},

  { path: 'productos/unidades', component: UnidadesComponent, data: { titulo: 'Unidades' }},
  { path: 'productos/unidades/nuevo', component: UnidadComponent, data: { titulo: 'Nueva Unidad' }},
  { path: 'productos/marcas', component: MarcasComponent, data: { titulo: 'Marcas' }},
  { path: 'productos/imagenes/:IdProducto', component: ImagenesProductoComponent, data: { titulo: 'Imagenes' }},
  { path: 'productos/imagenes/nueva/:IdProducto', component: NuevaImagenProductoComponent, data: { titulo: 'Nueva Imagen' }},
  //
  { path: 'promociones', component: PromocionesComponent, data: { titulo: 'Promociones' }},
  { path: 'promociones/nueva', component: PromocionComponent, data: { titulo: 'Nueva Promocion' }},
  //
  { path: 'pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' }},
  { path: 'venta/nueva', component: NuevaVentaComponent, data: { titulo: 'Nueva venta' }},
  { path: 'ventas/:IdPersona', component: MisVentasComponent, data: { titulo: 'Mis ventas' }},
  //
  { path: 'compras', component: ComprasComponent, data: { titulo: 'Listado de compras' }},
  { path: 'compras/nueva', component: NuevaCompraComponent, data: { titulo: 'Nueva compra' }},
  { path: 'compras/:IdPersona', component: MisComprasComponent, data: { titulo: 'Mis compras' }},
  // Rutas de Admin
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
  { path: 'usuarios/nuevo', component: UsuarioComponent, data: { titulo: 'Alta de Usuario' } }
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
