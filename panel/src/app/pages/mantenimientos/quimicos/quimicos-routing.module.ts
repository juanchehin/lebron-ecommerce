import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuimicosComponent } from './quimicos/quimicos.component';
import { QuimicoComponent } from './quimicos/quimico.component';
import { EditarQuimicoComponent } from './quimicos/editar-quimico.component';


const routes: Routes = [
   // Quimicos
   { path: '', component: QuimicosComponent, data: { titulo: 'Productos quimicos' }},
   { path: 'nuevo', component: QuimicoComponent, data: { titulo: 'Nuevo producto quimico' }},
   { path: 'editar/:IdProducto', component: EditarQuimicoComponent, data: { titulo: 'Edicion de producto quimico' }}   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuimicosRoutingModule { }
