import { ApiEndpoints } from './api-endpoints';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { FillableForm } from 'src/services/fillable-form';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _uploadsUrlPrefix = 'http://localhost:3000/images/uploads';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

  private performSimplePost(url: string, initiatingContainer: FillableForm, formData) {
    initiatingContainer.actionPending();
    this.http.post(url, formData, this.getAuthorizationToken())
      .subscribe(res => {
        initiatingContainer.actionSuccess();
      });
  }

  private performSimpleGet(url: string): Observable<any> {
    return this.http.get(url);
  }

  public get uploadsUrlPrefix(): String {
    return this._uploadsUrlPrefix;
  }

  public uploadImage(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD, initiatingContainer, formData);
  }

  public addWork(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.WORK, initiatingContainer, formData);
  }

  public createBlog(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.BLOG, initiatingContainer, formData);
  }

  public fetchBlog(blogId: string): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.BLOG + `/${blogId}`);
  }

  public fetchBlogs(): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.BLOG);
  }

  public generateUniqueChronoString() {
    var ts = String(new Date().getTime()),
      i = 0,
      out = '';

    for (i = 0; i < ts.length; i += 2) {
      out += Number(ts.substr(i, 2)).toString(36);
    }

    return out;
  }

}
