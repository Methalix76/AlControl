// medicamento.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import medicamentosData from '../../assets/medicamento.json';

interface Medicamento {
  Diagnostico: string;
  'Nombre Medicamento': string;
  'Nombre comercial': string;
  gramaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  constructor(private firestore: AngularFirestore) {}

  getDiagnosticos(): string[] {
    const medicamentos: Medicamento[] = medicamentosData.medicamentos;
    const diagnosticos = medicamentos.map(m => m.Diagnostico);
    return [...new Set(diagnosticos)] as string[];
  }

  getMedicamentosByDiagnostico(diagnostico: string): Medicamento[] {
    return medicamentosData.medicamentos.filter((m: Medicamento) => m.Diagnostico === diagnostico);
  }

  addNuevoDiagnostico(diagnostico: string): Promise<void> {
    return this.firestore.collection('diagnosticos').doc(diagnostico).set({
      nombre: diagnostico,
      fechaCreacion: new Date().toISOString()
    });
  }

  guardarPrescripcion(prescripcion: any): Promise<any> {
    return this.firestore.collection('prescripciones').add(prescripcion);
  }
}