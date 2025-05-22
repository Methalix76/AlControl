// src/app/guards/logged-out.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth'; // Importa Auth de AngularFire

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.user.pipe(
      map(user => {
        if (user) {
          // Si hay un usuario logueado, redirige a la página de bienvenida
          console.log('LoggedOutGuard: Usuario autenticado. Redirigiendo a /bienvenida.');
          return this.router.createUrlTree(['/bienvenida']);
        } else {
          // Si no hay usuario, permite el acceso (pueden ver login/register/recupera)
          console.log('LoggedOutGuard: Usuario no autenticado. Acceso permitido.');
          return true;
        }
      })
    );
  }
}