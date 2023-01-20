import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailureComponent } from './failure/failure.component';

const routes: Routes = [
  { path: '', component: FailureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FailureRoutingModule { }
