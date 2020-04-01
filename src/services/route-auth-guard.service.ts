import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// Brute force route redirection for unauthenticated users
export class RouteAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, public router: Router) { }
  
  // Using this route guard in app-routing.module.ts,
  // if the user cannot view a route, he is redirected to the login page
  canActivate(): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}