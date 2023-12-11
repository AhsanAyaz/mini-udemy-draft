import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'mini-udemy-cwa',
          appId: '1:1031406876104:web:f5616e1e88bd0e85a3bcfd',
          storageBucket: 'mini-udemy-cwa.appspot.com',
          apiKey: 'AIzaSyDqIKWkD6_8uRGb2ASpr_mGQcfUy7QYVaI',
          authDomain: 'mini-udemy-cwa.firebaseapp.com',
          messagingSenderId: '1031406876104',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
