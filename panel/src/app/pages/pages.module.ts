import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
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


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    ProveedoresComponent,
    ProductosComponent,
    ProductoComponent,
    MarcasComponent,
    UsuarioComponent,
    UnidadesComponent,
    UnidadComponent,
    NuevaVentaComponent,
    ConfiguracionesComponent,
    ImagenesProductoComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    AutocompleteLibModule
  ]
})
export class PagesModule { }
