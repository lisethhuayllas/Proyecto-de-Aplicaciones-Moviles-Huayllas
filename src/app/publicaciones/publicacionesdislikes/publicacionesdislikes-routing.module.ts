import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionesdislikesPage } from './publicacionesdislikes.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacionesdislikesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionesdislikesPageRoutingModule {}
