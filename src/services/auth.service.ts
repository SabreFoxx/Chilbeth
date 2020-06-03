import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FillableForm } from 'src/services/fillable-form';
import { ApiEndpoints } from './api-endpoints';
import { BROWSER_STORAGE } from 'src/app/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginComponent: FillableForm;

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,
    private jwtHelper: JwtHelperService) {

  }

  // Gets JWT token to browser local storage
  public getToken(): string {
    return this.storage.getItem('auth-token');
  }

  // Saves JWT token to browser local storage
  public saveToken(token: string): void {
    this.storage.setItem('auth-token', token);
  }

  public login(data: { email: String, password: String }) {
    this._loginComponent.actionPending();
    this.http.post(ApiEndpoints.LOGIN, data)
      .subscribe((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
          this._loginComponent.actionSuccess();
        }
      }, (error) => {
        console.log("");
      });
  }

  set loginComponent(component: FillableForm) {
    this._loginComponent = component;
  }

  get isAuthenticated(): boolean {
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

}
