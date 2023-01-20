import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { FranquiciaComponent } from './franquicia/franquicia.component';
import { PoliticasComponent } from './politicas-seguridad/politicas-seguridad.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';

const routes: Routes = [
  { path: 'terminos-y-condiciones', component: TerminosCondicionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'franquicia', component: FranquiciaComponent },
  { path: 'politicas-de-seguridad', component: PoliticasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitucionalRoutingModule { }
