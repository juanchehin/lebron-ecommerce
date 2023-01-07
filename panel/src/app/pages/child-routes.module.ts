import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { MarcasComponent } from './mantenimientos/productos/marcas/marcas.component';
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
import { TransferenciasComponent } from './mantenimientos/transferencias/transferencias.component';
import { TransferenciaComponent } from './mantenimientos/transferencias/transferencia.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ClienteComponent } from './mantenimientos/clientes/cliente.component';
import { EditarClienteComponent } from './mantenimientos/clientes/editar-cliente.component';
import { CuentasComponent } from './mantenimientos/cuentas-corrientes/cuentas.component';
import { EditarClienteCuentaComponent } from './mantenimientos/cuentas-corrientes/editar-cliente-cuenta.component';
import { CuentaComponent } from './mantenimientos/cuentas-corrientes/cuenta.component';
import { MovimientosComponent } from './mantenimientos/cuentas-corrientes/movimientos.component';
import { VentasComponent } from './mantenimientos/ventas/listar-ventas/ventas.component';
import { NuevoGastoComponent } from './mantenimientos/compras/gastos/nuevo-gasto/nuevo-gasto.component';
import { ListarGastosComponent } from './mantenimientos/compras/gastos/listar-gastos/listar-gastos.component';
import { EditarProveedorComponent } from './mantenimientos/proveedores/editar-proveedor.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { CategoriaComponent } from './mantenimientos/categorias/categoria.component';
import { EditarCategoriaComponent } from './mantenimientos/categorias/editar-categoria.component';
import { SubCategoriasComponent } from './mantenimientos/subcategorias/subcategorias.component';
import { SubCategoriaComponent } from './mantenimientos/subcategorias/subcategoria.component';
import { EditarSubcategoriaComponent } from './mantenimientos/subcategorias/editar-subcategoria.component';
import { EditarUsuarioComponent } from './mantenimientos/usuarios/editar-usuario.component';
import { MarcaComponent } from './mantenimientos/productos/marcas/marca.component';
import { EditarMarcaComponent } from './mantenimientos/productos/marcas/editar-marca.component';
import { SaboresComponent } from './mantenimientos/productos/sabores/sabores.component';
import { SaborComponent } from './mantenimientos/productos/sabores/sabor.component';
import { EditarSaborComponent } from './mantenimientos/productos/sabores/editar-sabor.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  // Mantenimientos
  { path: 'proveedores', component: ProveedoresComponent, data: { titulo: 'Proveedores' }},
  { path: 'proveedores/nuevo', component: ProveedorComponent, data: { titulo: 'Alta de proveedor' }},
  { path: 'proveedor/:IdProveedor', component: EditarProveedorComponent, data: { titulo: 'Edicion de proveedor' }},
  // transferencias
  { path: 'transferencias', component: TransferenciasComponent, data: { titulo: 'Transferencias' }},
  { path: 'transferencias/nueva', component: TransferenciaComponent, data: { titulo: 'Nueva transferencia de stock' }},
  { path: 'configuraciones', component: ConfiguracionesComponent, data: { titulo: 'Configuraciones' }},
  // Productos
  { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' }},
  { path: 'productos/nuevo', component: ProductoComponent, data: { titulo: 'Nuevo Producto' }},
  { path: 'producto/:IdProducto', component: EditarProductoComponent, data: { titulo: 'Edicion de producto' }},
  { path: 'productos/unidades', component: UnidadesComponent, data: { titulo: 'Unidades' }},
  { path: 'productos/unidades/nuevo', component: UnidadComponent, data: { titulo: 'Nueva Unidad' }},
  // Productos - marcas
  { path: 'productos/marcas', component: MarcasComponent, data: { titulo: 'Marcas' }},
  { path: 'productos/marcas/nueva', component: MarcaComponent, data: { titulo: 'Nueva Marca' }},
  { path: 'productos/marca/:IdMarca', component: EditarMarcaComponent, data: { titulo: 'Editar Marca' }},
  // Productos - sabores
  { path: 'productos/sabores', component: SaboresComponent, data: { titulo: 'Sabores' }},
  { path: 'productos/sabores/nueva', component: SaborComponent, data: { titulo: 'Nueva Sabor' }},
  { path: 'productos/sabor/:IdSabor', component: EditarSaborComponent, data: { titulo: 'Editar Sabor' }},
  // Imagenes
  { path: 'productos/imagenes/:IdProducto', component: ImagenesProductoComponent, data: { titulo: 'Imagenes' }},
  { path: 'productos/imagenes/nueva/:IdProducto', component: NuevaImagenProductoComponent, data: { titulo: 'Nueva Imagen' }},
  //
  { path: 'promociones', component: PromocionesComponent, data: { titulo: 'Promociones' }},
  { path: 'promociones/nueva', component: PromocionComponent, data: { titulo: 'Nueva Promocion' }},
  // Categorias
  { path: 'productos/categorias', component: CategoriasComponent, data: { titulo: 'Categorias' }},
  { path: 'productos/categorias/nueva', component: CategoriaComponent, data: { titulo: 'Nueva Categoria' }},
  { path: 'productos/categoria/:IdCategoria', component: EditarCategoriaComponent, data: { titulo: 'Editar Categoria' }},
  // SubCategorias
  { path: 'productos/subcategorias', component: SubCategoriasComponent, data: { titulo: 'Subcategorias' }},
  { path: 'productos/subcategorias/nueva', component: SubCategoriaComponent, data: { titulo: 'Nueva Subcategoria' }},
  { path: 'productos/subcategoria/:IdCategoria', component: EditarSubcategoriaComponent, data: { titulo: 'Editar Subcategoria' }},
  //
  { path: 'pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' }},
  { path: 'ventas/listar', component: VentasComponent, data: { titulo: 'Listado de Ventas' }},
  { path: 'venta/nueva', component: NuevaVentaComponent, data: { titulo: 'Nueva venta' }},
  { path: 'ventas/:IdPersona', component: MisVentasComponent, data: { titulo: 'Mis ventas' }},
  //
  { path: 'compras', component: ComprasComponent, data: { titulo: 'Listado de compras' }},
  { path: 'compras/nueva', component: NuevaCompraComponent, data: { titulo: 'Nueva compra' }},
  { path: 'compras/:IdPersona', component: MisComprasComponent, data: { titulo: 'Mis compras' }},
  //
  { path: 'gastos', component: ListarGastosComponent, data: { titulo: 'Listado de gastos' }},
  { path: 'gastos/nuevo', component: NuevoGastoComponent, data: { titulo: 'Nuevo gasto' }},
  // { path: 'gastos/:IdGasto', component: MisComprasComponent, data: { titulo: 'Mis compras' }},
  //
  { path: 'clientes', component: ClientesComponent, data: { titulo: 'Listado de clientes' }},
  { path: 'clientes/nuevo', component: ClienteComponent, data: { titulo: 'Nuevo cliente' }},
  { path: 'cliente/:IdPersona', component: EditarClienteComponent, data: { titulo: 'Edicion de cliente' }},
  //
  { path: 'cuentas', component: CuentasComponent, data: { titulo: 'Clientes con cuenta corriente' }},
  { path: 'cuenta/nueva', component: CuentaComponent, data: { titulo: 'Nueva cuenta' }},
  { path: 'cuenta/:IdPersona', component: EditarClienteCuentaComponent, data: { titulo: 'Edicion de cliente' }},
  { path: 'cuenta/movimientos/:IdPersona', component: MovimientosComponent, data: { titulo: 'Movimientos' }},
  // Rutas de Admin
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
  { path: 'usuarios/nuevo', component: UsuarioComponent, data: { titulo: 'Alta de Usuario' } },
  { path: 'usuario/:IdUsuario', component: EditarUsuarioComponent, data: { titulo: 'Edicion de Usuario' } }

]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
