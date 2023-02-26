import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackupsComponent } from './backups/backups.component';


const routes: Routes = [
   // Backups
   { path: '', component: BackupsComponent, data: { titulo: 'Backups' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupsRoutingModule { }
