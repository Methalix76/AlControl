import { Injectable } from '@angular/core';
import { Firestore, collection,addDoc, getDocs, updateDoc, doc, query, where, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async guardarDiagnosticoConImagen(data: {
    diagnostico: string,
    medicamento: string,
    gramaje: string,
    cantidad: string,
    presentacion: string,
    frecuencia: string | number,
    horaInicio: string | number,
    duracion: string | number,
    uid: string
  }) {
    const coleccionRef = collection(this.firestore, 'prescripciones');
    return await addDoc(coleccionRef, data);
  }

  async obtenerPrescripcionesPorUsuario(uid: string): Promise<any[]> {
    const prescripcionesRef = collection(this.firestore, 'prescripciones');
    const q = query(prescripcionesRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async actualizarPrescripcionesConUID() {
    const prescripcionesRef = collection(this.firestore, 'prescripciones');
    const snapshot = await getDocs(prescripcionesRef);

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const docRef = doc(this.firestore, 'prescripciones', docSnap.id);

      if (data['email']) {
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('email', '==', data['email']));
        const userSnap = await getDocs(q);

        if (!userSnap.empty) {
          const uid = userSnap.docs[0].id;
          await updateDoc(docRef, { uid });
          console.log(`Prescripción ${docSnap.id} actualizada con uid: ${uid}`);
        } else {
          console.warn(`No se encontró usuario con email: ${data['email']}`);
        }
      } else {
        console.warn(`Prescripción ${docSnap.id} no tiene campo email`);
      }
    }
  }

  async actualizarEstadoDosis(prescripcionId: string, indiceDosis: number, nuevoEstado: string): Promise<void> {
    const docRef = doc(this.firestore, 'prescripciones', prescripcionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Prescripción no encontrada');
    }

    const data = docSnap.data();
    const estados: string[] = Array.isArray(data['estadoDosis']) ? [...data['estadoDosis']] : [];

    // Asegurar que el array tenga la longitud suficiente
    while (estados.length <= indiceDosis) {
      estados.push('pendiente');
    }

    estados[indiceDosis] = nuevoEstado;

    await updateDoc(docRef, { estadoDosis: estados });
  }
}