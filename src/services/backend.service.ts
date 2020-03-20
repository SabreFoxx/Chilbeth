import { ApiEndpoints } from './api-endpoints';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { FillableForm } from 'src/services/fillable-form';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

  public uploadImage(initiatingContainer: FillableForm, formData) {
    initiatingContainer.actionPending();
    this.http.post(ApiEndpoints.UPLOAD, formData, this.getAuthorizationToken())
      .subscribe(res => {
        initiatingContainer.actionSuccess();
      });
  }

  public addWork(initiatingContainer: FillableForm, formData) {
    this.http.post(ApiEndpoints.WORK, formData, this.getAuthorizationToken())
      .subscribe(res => {
        initiatingContainer.actionSuccess();
      })
  }

  public createBlog(initiatingContainer: FillableForm, formData) {
    this.http.post(ApiEndpoints.BLOG, formData, this.getAuthorizationToken())
      .subscribe(res => {
        console.log(res); // TODO remove
        initiatingContainer.actionSuccess();
      })
  }

  public generateUniqueString() {
    var ts = String(new Date().getTime()),
      i = 0,
      out = '';

    for (i = 0; i < ts.length; i += 2) {
      out += Number(ts.substr(i, 2)).toString(36);
    }

    return out;
  }

}
