import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperaPageRoutingModule } from './recupera-routing.module';

import { RecuperaPage } from './recupera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperaPageRoutingModule
  ],
  declarations: [RecuperaPage]
})
export class RecuperaPageModule {}
