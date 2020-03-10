import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn: boolean = true;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  constructor() { }
}
