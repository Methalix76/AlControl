import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsulthistPage } from './consulthist.page';

const routes: Routes = [
  {
    path: '',
    component: ConsulthistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulthistPageRoutingModule {}
