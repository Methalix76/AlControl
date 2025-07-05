//Este es mi app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
   {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recupera',
    loadChildren: () => import('./recupera/recupera.module').then( m => m.RecuperaPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
   {
    path: 'vermed',
    loadChildren: () => import('./vermed/vermed.module').then( m => m.VermedPageModule)
  },
  {
    path: 'consulthist',
    loadChildren: () => import('./consulthist/consulthist.module').then( m => m.ConsulthistPageModule)
  },
  {
    path: 'agr-med',
    loadChildren: () => import('./agr-med/agr-med.module').then( m => m.AgrMedPageModule)
  },

 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
