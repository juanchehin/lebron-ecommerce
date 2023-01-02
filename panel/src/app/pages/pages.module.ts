import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { MarcasComponent } from './mantenimientos/productos/marcas/marcas.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { UnidadComponent } from './mantenimientos/productos/unidades/unidad.component';
import { UnidadesComponent } from './mantenimientos/productos/unidades/unidades.component';
import { NuevaVentaComponent } from './mantenimientos/ventas/nueva-venta/nueva-venta.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones.component';
import { ImagenesProductoComponent } from './mantenimientos/productos/imagenes/imagenes-producto.component';
import { NuevaImagenProductoComponent } from './mantenimientos/productos/imagenes/nueva-imagen-producto.component';
import { PedidosComponent } from './mantenimientos/pedidos/pedidos.component';
import { PromocionComponent } from './mantenimientos/promociones/promocion.component';
import { PromocionesComponent } from './mantenimientos/promociones/promociones.component';
import { EditarPromocionComponent } from './mantenimientos/promociones/editar-promocion.component';
import { MisVentasComponent } from './mantenimientos/ventas/mis-ventas/mis-ventas.component';
import { NuevaCompraComponent } from './mantenimientos/compras/nueva-compra/nueva-compra.component';
import { MisComprasComponent } from './mantenimientos/compras/mis-compras/mis-compras.component';
import { ComprasComponent } from './mantenimientos/compras/listar-compras/compras.component';
import { ProveedorComponent } from './mantenimientos/proveedores/proveedor.component';
import { EditarProductoComponent } from './mantenimientos/productos/editar-producto.component';
import { TransferenciaComponent } from './mantenimientos/transferencias/transferencia.component';
import { TransferenciasComponent } from './mantenimientos/transferencias/transferencias.component';
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
import { EditarCategoriaComponent } from './mantenimientos/categorias/editar-categoria.component';
import { CategoriaComponent } from './mantenimientos/categorias/categoria.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { SubCategoriaComponent } from './mantenimientos/subcategorias/subcategoria.component';
import { SubCategoriasComponent } from './mantenimientos/subcategorias/subcategorias.component';
import { EditarSubcategoriaComponent } from './mantenimientos/subcategorias/editar-subcategoria.component';
import { EditarUsuarioComponent } from './mantenimientos/usuarios/editar-usuario.component';
import { MarcaComponent } from './mantenimientos/productos/marcas/marca.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    ProveedoresComponent,
    ProveedorComponent,
    EditarProveedorComponent,
    ProductosComponent,
    ProductoComponent,
    CategoriaComponent,
    CategoriasComponent,
    EditarCategoriaComponent,
    SubCategoriaComponent,
    SubCategoriasComponent,
    EditarSubcategoriaComponent,
    EditarProductoComponent,
    MarcasComponent,
    MarcaComponent,
    UsuarioComponent,
    UnidadesComponent,
    UnidadComponent,
    ConfiguracionesComponent,
    ImagenesProductoComponent,
    NuevaImagenProductoComponent,
    PedidosComponent,
    PromocionesComponent,
    PromocionComponent,
    EditarPromocionComponent,
    VentasComponent,
    MisVentasComponent,
    NuevaVentaComponent,
    NuevaCompraComponent,
    MisComprasComponent,
    NuevoGastoComponent,
    ListarGastosComponent,
    ComprasComponent,
    TransferenciasComponent,
    TransferenciaComponent,
    ClientesComponent,
    ClienteComponent,
    EditarClienteComponent,
    CuentasComponent,
    CuentaComponent,
    EditarClienteCuentaComponent,
    MovimientosComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ConfiguracionesComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    AutocompleteLibModule
  ]
})
export class PagesModule { }
