import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//para conectar a Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './credentials';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports:
    [

      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

      provideAuth(() => getAuth()), //Para la utenticacion    liseeeeth!

      provideFirestore(() => getFirestore()),

      provideStorage(() => getStorage()),

    ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
