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

  public getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

  private performSimplePost(url: string, initiatingContainer: FillableForm, formData) {
    if (initiatingContainer)
      initiatingContainer.actionPending();
    this.http.post(url, formData, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        initiatingContainer.actionSuccess();
      });
  }

  private performSimplePut(url: string, initiatingContainer: FillableForm, formData) {
    initiatingContainer.actionPending();
    this.http.put(url, formData, this.getAuthorizationToken()) // TODO handle errors appropriately
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

  public uploadImageAndDeleteOld(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD + '/and_delete_too', initiatingContainer, formData);
  }

  public uploadLandingImage(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD_LANDING, initiatingContainer, formData);
  }

  public uploadArtworkImage(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD_ARTWORK, initiatingContainer, formData);
  }

  public uploadProfile(initiatingContainer: FillableForm, formData, type: string) {
    if (type == "profilePicture")
      this.performSimplePost(ApiEndpoints.UPLOAD_PROFILE + '/profilePicture', initiatingContainer, formData);
    else if (type == "thumbnail")
      this.performSimplePost(ApiEndpoints.UPLOAD_PROFILE + '/profileThumbnail', initiatingContainer, formData);
    else if (type == "curriculumVitae")
      this.performSimplePost(ApiEndpoints.UPLOAD_PROFILE + '/curriculumVitae', initiatingContainer, formData);
  }

  public uploadSiteLogo(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.UPLOAD_SITE_LOGO, initiatingContainer, formData);
  }

  public addWork(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.WORK + `/${formData.category}`, initiatingContainer, formData);
  }

  public updateWork(initiatingContainer: FillableForm, formData, workId: string) {
    this.performSimplePut(ApiEndpoints.WORK + `/${workId}`, initiatingContainer, formData);
  }

  public fetchWork(workId: string): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.WORK + `/${workId}`);
  }

  public addWorkCategory(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.WORK_CATEGORIES, initiatingContainer, formData);
  }

  public fetchWorkCategories(): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.WORK_CATEGORIES);
  }

  public deleteWorkCategory(categoryId: String): Observable<any> {
    return this.performSimpleDelete(ApiEndpoints.WORK_CATEGORIES + `/${categoryId}`);
  }

  public addExhibition(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.EXHIBITION, initiatingContainer, formData);
  }

  public updateExhibition(initiatingContainer: FillableForm, formData, exhibitionId: string) {
    this.performSimplePut(ApiEndpoints.EXHIBITION + `/${exhibitionId}`, initiatingContainer, formData);
  }

  public fetchExhibition(exhibitionId: string): Observable<any> {
    return this.performSimpleGet(ApiEndpoints.EXHIBITION + `/${exhibitionId}`);
  }

  public createBlog(initiatingContainer: FillableForm, formData) {
    this.performSimplePost(ApiEndpoints.BLOG, initiatingContainer, formData);
  }

  public updateBlog(initiatingContainer: FillableForm, formData, blogId: string) {
    this.performSimplePut(ApiEndpoints.BLOG + `/${blogId}`, initiatingContainer, formData);
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
