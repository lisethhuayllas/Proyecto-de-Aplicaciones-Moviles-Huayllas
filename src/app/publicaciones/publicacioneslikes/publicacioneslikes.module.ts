import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacioneslikesPageRoutingModule } from './publicacioneslikes-routing.module';

import { PublicacioneslikesPage } from './publicacioneslikes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacioneslikesPageRoutingModule
  ],
  declarations: [PublicacioneslikesPage]
})
export class PublicacioneslikesPageModule {}
