// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth'; // Importa Auth de AngularFire

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // auth.user es un Observable que emite el estado del usuario (null si no logueado, User si lo está)
    return this.auth.user.pipe(
      map(user => {
        if (user) {
          // Si hay un usuario logueado, permite el acceso a la ruta
          console.log('AuthGuard: Usuario autenticado. Acceso permitido.');
          return true;
        } else {
          // Si no hay usuario, redirige a la página de login
          console.log('AuthGuard: Usuario no autenticado. Redirigiendo a /login.');
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}