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
    path: 'ingmedicamento',
    loadChildren: () => import('./ingmedicamento/ingmedicamento.module').then( m => m.IngmedicamentoPageModule)
  },
  {
    path: 'registromed',
    loadChildren: () => import('./registromed/registromed.module').then( m => m.RegistromedPageModule)
  },
  {
    path: 'vermed',
    loadChildren: () => import('./vermed/vermed.module').then( m => m.VermedPageModule)
  },
  {
    path: 'consulthist',
    loadChildren: () => import('./consulthist/consulthist.module').then( m => m.ConsulthistPageModule)
  },

 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
