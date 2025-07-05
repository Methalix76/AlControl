import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgrMedPage } from './agr-med.page';

const routes: Routes = [
  {
    path: '',
    component: AgrMedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgrMedPageRoutingModule {}
