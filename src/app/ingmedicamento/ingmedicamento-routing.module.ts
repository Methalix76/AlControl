import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngmedicamentoPage } from './ingmedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: IngmedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngmedicamentoPageRoutingModule {}
