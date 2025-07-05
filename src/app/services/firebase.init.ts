// src/app/services/firebase.init.ts  
import { initializeApp } from 'firebase/app';  
import { environment } from '../../environments/environment';  

// App inicializada para usarla en otros servicios  
export const firebaseApp = initializeApp(environment.firebaseConfig);  