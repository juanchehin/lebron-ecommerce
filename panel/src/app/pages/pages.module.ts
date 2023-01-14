import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

import { ConfiguracionesComponent } from './mantenimientos/configuraciones/configuraciones.component';


// odules
import { ProveedoresModule } from './mantenimientos/proveedores/proveedores.module';
import { ProductosModule } from './mantenimientos/productos/productos.module';
import { CategoriasModule } from './mantenimientos/categorias/categorias.module';
import { ClientesModule } from './mantenimientos/clientes/clientes.module';
import { ComprasModule } from './mantenimientos/compras/compras.module';
import { CuentasCorrientesModule } from './mantenimientos/cuentas-corrientes/cuentas-corrientes.module';
import { PromocionesModule } from './mantenimientos/promociones/promociones.module';
import { SubcategoriasModule } from './mantenimientos/subcategorias/subcategorias.module';
import { UsuariosModule } from './mantenimientos/usuarios/usuarios.module';
import { VentasModule } from './mantenimientos/ventas/ventas.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    PerfilComponent,
    ConfiguracionesComponent
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
    // ProveedoresModule,
    // ProductosModule,
    // CategoriasModule,
    // ClientesModule,
    // ComprasModule,
    // CuentasCorrientesModule,
    PromocionesModule,
    // SubcategoriasModule,
    // UsuariosModule,
    // VentasModule
  ]
})
export class PagesModule { }
