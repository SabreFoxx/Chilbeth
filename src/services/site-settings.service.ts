import { ApiEndpoints } from 'src/services/api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/* SiteSettings is the general site settings for both authenticated and unauthenticated users. For example, what is the landing page's image? */
@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveLandingImage(sortingHash: string, landingImageIndex: number) {
    let formText: any;
    formText.landImageOne = sortingHash;
    this.http.put(ApiEndpoints.SITE_SETTINGS, formText, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        console.log(res) // TODO
      });
  }

  private getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

}
