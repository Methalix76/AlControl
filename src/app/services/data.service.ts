//Este es mi: data.service.ts

import { Injectable } from '@angular/core';  
import { getFirestore, collection, getDocs } from 'firebase/firestore';  
import { firebaseApp } from './firebase.init';  // Importa desde servicios  

@Injectable({  
  providedIn: 'root'  
})  
export class DataService {  
  private db = getFirestore(firebaseApp);  

  async getData(collectionName: string) {  
    const colRef = collection(this.db, collectionName);  
    const snapshot = await getDocs(colRef);  
    return snapshot.docs.map(doc => doc.data());  
  }  
}  