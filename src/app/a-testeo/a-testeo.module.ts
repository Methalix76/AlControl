import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ATesteoPageRoutingModule } from './a-testeo-routing.module';

import { ATesteoPage } from './a-testeo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ATesteoPageRoutingModule
  ],
  declarations: [ATesteoPage]
})
export class ATesteoPageModule {}
