import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ATesteoPage } from './a-testeo.page';

const routes: Routes = [
  {
    path: '',
    component: ATesteoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ATesteoPageRoutingModule {}
