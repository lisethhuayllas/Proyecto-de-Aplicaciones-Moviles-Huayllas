import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesdislikesPageRoutingModule } from './publicacionesdislikes-routing.module';

import { PublicacionesdislikesPage } from './publicacionesdislikes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionesdislikesPageRoutingModule
  ],
  declarations: [PublicacionesdislikesPage]
})
export class PublicacionesdislikesPageModule {}
