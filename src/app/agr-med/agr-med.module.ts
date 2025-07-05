import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgrMedPageRoutingModule } from './agr-med-routing.module';
import { AgrMedPage } from './agr-med.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgrMedPageRoutingModule
  ],
  declarations: [AgrMedPage]
})
export class AgrMedPageModule {}
