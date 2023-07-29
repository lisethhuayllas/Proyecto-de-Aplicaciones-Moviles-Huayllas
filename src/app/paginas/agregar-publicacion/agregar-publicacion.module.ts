import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPublicacionPageRoutingModule } from './agregar-publicacion-routing.module';

import { AgregarPublicacionPage } from './agregar-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPublicacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarPublicacionPage]
})
export class AgregarPublicacionPageModule {}
