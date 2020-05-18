import { FillableForm } from './fillable-form';
import { ApiEndpoints } from './api-endpoints';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _uploadsUrlPrefix = ApiEndpoints.UPLOADED_FILES;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

  private performSimplePost(url: string, initiatingContainer: FillableForm, formData) {
    initiatingContainer.actionPending();
    this.http.post(url, formData, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        initiatingContainer.actionSuccess();
      });
  }

  public performSimpleDelete(url: string) {
    return this.http.delete(url, this.getAuthorizationToken()); // TODO handle errors appropriately
  }

  public performSimpleGet(url: string): Observable<any> {
    return this.http.get(url); // TODO handle errors appropriately
  }

  public get uploadsUrlPrefix(): String {
    return this._uploadsUrlPrefix;
  }

  public uploadImage(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD, initiatingContainer, formData);
  }

  public uploadLandingImage(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD_LANDING, initiatingContainer, formData);
  }

  public uploadProfilePicture(initiatingContainer: FillableForm, formData, type: string) {
    if (type == 'profilePicture')
      this.performSimplePost(ApiEndpoints.UPLOAD_PROFILE_PICTURE + '/profilePicture', initiatingContainer, formData);
    else if (type == 'thumbnail')
      this.performSimplePost(ApiEndpoints.UPLOAD_PROFILE_PICTURE + '/profileThumbnail', initiatingContainer, formData);
  }

  public addWork(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.WORK, initiatingContainer, formData);
  }

  public fetchWork(workId: string): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.WORK + `/${workId}`);
  }

  public createBlog(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.BLOG, initiatingContainer, formData);
  }

  public fetchBlog(blogId: string): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.BLOG + `/${blogId}`);
  }

  public addBlogComment(initiatingContainer: FillableForm, formData, blogId: string) { // TODO urgent: visitors cannot add comments due to auth restrictions
    this.performSimplePost(ApiEndpoints.BLOG + `/${blogId}/comment`, initiatingContainer, formData);
  }

  public fetchBlogComments(blogId: string): Observable<any> { // TODO implement fetch comments pagination
    return this.performSimpleGet(ApiEndpoints.BLOG + `/${blogId}/comment/1`);
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
