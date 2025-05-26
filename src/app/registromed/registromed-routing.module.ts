import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistromedPage } from './registromed.page';

const routes: Routes = [
  {
    path: '',
    component: RegistromedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistromedPageRoutingModule {}
