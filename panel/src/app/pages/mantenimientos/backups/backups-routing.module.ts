import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuimicosComponent } from './backups/backups.component';


const routes: Routes = [
   // Quimicos
   { path: '', component: BackupsComponent, data: { titulo: 'Productos quimicos' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupsRoutingModule { }
