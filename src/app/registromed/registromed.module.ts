import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistromedPageRoutingModule } from './registromed-routing.module';

import { RegistromedPage } from './registromed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistromedPageRoutingModule
  ],
  declarations: [RegistromedPage]
})
export class RegistromedPageModule {}
