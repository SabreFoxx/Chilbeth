import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from 'src/app/storage';
import { FillableForm } from 'src/services/fillable-form';

enum ApiEndpoints {
  LOGIN = "http://localhost:3000/api/login"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn: boolean;
  private _loginComponent: FillableForm;

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private http: HttpClient) {

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
          this._isLoggedIn = true;
          this._loginComponent.actionSuccess();
        }
      }, (error) => {
        console.log(error); // TODO
      });
  }

  set loginComponent(component: FillableForm) {
    this._loginComponent = component;
  }

  get isLoggedIn() {
    return this._isLoggedIn && (this.getToken() != "");
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

}
