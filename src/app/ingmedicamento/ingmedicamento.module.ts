import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IngmedicamentoPageRoutingModule } from './ingmedicamento-routing.module';
import { IngmedicamentoPage } from './ingmedicamento.page';

// 1. Importar el servicio de medicamentos
import { MedicamentoService } from '../services/medicamento.service';

// 2. Importar módulos de Firebase (versión compatible)
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngmedicamentoPageRoutingModule,
    // 3. Agregar módulo de Firestore
    AngularFirestoreModule
  ],
  declarations: [IngmedicamentoPage],
  // 4. Registrar el servicio como proveedor
  providers: [MedicamentoService]
})
export class IngmedicamentoPageModule {}