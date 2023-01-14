import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ListarProveedoresComponent } from './proveedores/listar-proveedores.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
import { ProveedorComponent } from './nuevo-proveedor/proveedor.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProveedoresRoutingModule,
    RouterModule
  ],
  declarations: [
    ListarProveedoresComponent,
    EditarProveedorComponent,
    ProveedorComponent
  ]
})
export class ProveedoresModule {}
