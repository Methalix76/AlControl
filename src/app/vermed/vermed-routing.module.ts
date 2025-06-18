import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VermedPage } from './vermed.page';

const routes: Routes = [
  {
    path: '',
    component: VermedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VermedPageRoutingModule {}
