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
import { MarcasComponent } from './mantenimientos/marcas/marcas.component';
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

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    ProveedoresComponent,
    ProveedorComponent,
    ProductosComponent,
    ProductoComponent,
    EditarProductoComponent,
    MarcasComponent,
    UsuarioComponent,
    UnidadesComponent,
    UnidadComponent,
    NuevaVentaComponent,
    ConfiguracionesComponent,
    ImagenesProductoComponent,
    NuevaImagenProductoComponent,
    PedidosComponent,
    PromocionesComponent,
    PromocionComponent,
    EditarPromocionComponent,
    MisVentasComponent,
    NuevaCompraComponent,
    MisComprasComponent,
    ComprasComponent
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
