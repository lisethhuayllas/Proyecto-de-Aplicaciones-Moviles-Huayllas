import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMiperfilPageRoutingModule } from './editar-miperfil-routing.module';

import { EditarMiperfilPage } from './editar-miperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMiperfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarMiperfilPage]
})
export class EditarMiperfilPageModule {}
