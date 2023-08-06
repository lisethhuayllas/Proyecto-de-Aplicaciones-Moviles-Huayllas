import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMispublicacionesPage } from './agregar-mispublicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMispublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMispublicacionesPageRoutingModule {}
