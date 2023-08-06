import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MispublicacionesPageRoutingModule } from './mispublicaciones-routing.module';

import { MispublicacionesPage } from './mispublicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MispublicacionesPageRoutingModule
  ],
  declarations: [MispublicacionesPage]
})
export class MispublicacionesPageModule {}
