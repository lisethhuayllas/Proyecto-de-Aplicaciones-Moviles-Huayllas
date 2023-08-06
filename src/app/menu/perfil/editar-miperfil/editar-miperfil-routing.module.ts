import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMiperfilPage } from './editar-miperfil.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMiperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMiperfilPageRoutingModule {}
