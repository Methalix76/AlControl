import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsulthistPageRoutingModule } from './consulthist-routing.module';

import { ConsulthistPage } from './consulthist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsulthistPageRoutingModule
  ],
  declarations: [ConsulthistPage]
})
export class ConsulthistPageModule {}
