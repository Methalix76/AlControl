import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VermedPageRoutingModule } from './vermed-routing.module';

import { VermedPage } from './vermed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VermedPageRoutingModule
  ],
  declarations: [VermedPage]
})
export class VermedPageModule {}
