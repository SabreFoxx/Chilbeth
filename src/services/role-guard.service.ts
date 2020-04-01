import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
// Unlike RouteAuthGuard, this is a fine grained auth service,
// used for granting the user specific actions and operations,
// based on whether the user has the necessary permission
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // ActivatedRouteSnapshot will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    return this.canUse(expectedRole);
  }

  canUse(priviledge): boolean {
    // decode the token to get its payload
    const tokenPayload = decode(this.auth.getToken());
    console.log(tokenPayload); // TODO remove this
    if (!this.auth.isAuthenticated || tokenPayload[priviledge] !== true)
      return false;
    return true;
  }
}

/*
In this guard we’re using ActivatedRouteSnapshot to give us access to the data property for a
given route. This data property is useful because we can pass an object with some custom properties
to it from our route configuration (app-routing.module.ts). We can then pick up that custom data in
the guard to help with making routing decisions.

In this case we’re looking for a role that we expect the user to have if they are to be allowed
access to the route. Next we are decoding the token to grab its payload.
*/