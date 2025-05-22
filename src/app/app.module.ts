import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// --- Importaciones y configuraciones de Firebase ---
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'; // Si usas Autenticación
import { environment } from '../environments/environment'; // Tu archivo de configuración de Firebase
// --- FIN: Importaciones y configuraciones de Firebase ---

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // ¡¡¡QUITAR ESTAS LÍNEAS DE AQUÍ!!!
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    // provideAuth(() => getAuth()), // Si usas Autenticación
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // --- INICIO: AÑADE ESTAS LÍNEAS AQUÍ EN 'providers' ---
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), // Si usas Autenticación
    // --- FIN: AÑADE ESTAS LÍNEAS AQUÍ ---
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}