import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProveedoresComponent } from './proveedores/listar-proveedores.component';
import { ProveedorComponent } from './nuevo-proveedor/proveedor.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';

const routes: Routes = [
  { path: '', component: ListarProveedoresComponent, data: { titulo: 'Proveedores' }},
  { path: 'nuevo', component: ProveedorComponent, data: { titulo: 'Alta de proveedor' }},
  { path: 'editar/:IdProveedor', component: EditarProveedorComponent, data: { titulo: 'Edicion de proveedor' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
