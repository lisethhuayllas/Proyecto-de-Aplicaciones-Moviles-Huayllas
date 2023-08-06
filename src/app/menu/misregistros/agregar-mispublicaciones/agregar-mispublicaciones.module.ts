import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMispublicacionesPageRoutingModule } from './agregar-mispublicaciones-routing.module';

import { AgregarMispublicacionesPage } from './agregar-mispublicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMispublicacionesPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [AgregarMispublicacionesPage]
})
export class AgregarMispublicacionesPageModule {}
