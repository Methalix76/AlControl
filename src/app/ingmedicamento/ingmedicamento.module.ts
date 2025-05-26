import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngmedicamentoPageRoutingModule } from './ingmedicamento-routing.module';

import { IngmedicamentoPage } from './ingmedicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngmedicamentoPageRoutingModule
  ],
  declarations: [IngmedicamentoPage]
})
export class IngmedicamentoPageModule {}
