import { ApiEndpoints } from 'src/services/api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

interface SiteSettingsInterface {
  landingImageOne,
  landingImageTwo,
  landingImageThree,
  previousImageForDeletion,
  profilePicture,
  profileThumbnail
}

/* SiteSettings is the general site settings for both authenticated and unauthenticated users. For example, what is the landing page's image? */
@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  private _siteSettings: any = null;
  private settingsTemplate: SiteSettingsInterface = {
    landingImageOne: '',
    landingImageTwo: '',
    landingImageThree: '',
    previousImageForDeletion: '',
    profilePicture: '',
    profileThumbnail: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    // The constructor is run only once for a singleton object
    if (this._siteSettings === null) { // Fill in
      this._siteSettings = {
        landingImageOne: 'blank/blank', // Serve the blank image as placeholder initially, while we wait to fetch the real ones from the database
        landingImageTwo: 'blank/blank',
        landingImageThree: 'blank/blank',
        profilePicture: 'blank/blank',
        profileThumbnail: 'blank/blank'
      };
      this.fetchSiteSettingsFromDatabase();
    }
  }

  public saveLandingImage(sortingHash: string, landingImageIndex: number, previousSortingHashForDeletion: string) {
    let formText = this.settingsTemplate;
    switch (landingImageIndex) {
      case 0:
        formText.landingImageOne = sortingHash;
        break;
      case 1:
        formText.landingImageTwo = sortingHash;
        break;
      case 2:
        formText.landingImageThree = sortingHash;
        break;
    }
    formText.previousImageForDeletion = previousSortingHashForDeletion;
    this.http.put(ApiEndpoints.SITE_SETTINGS, formText, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        this._siteSettings = res;
      });
  }

  public saveProfileImage(sortingHash: string, type: string, previousSortingHashForDeletion: string) {
    let formText = this.settingsTemplate;
    switch (type) {
      case 'profilePicture':
        formText.profilePicture = sortingHash;
        break;
      case 'thumbnail':
        formText.profileThumbnail = sortingHash;
        break;
    }
    formText.previousImageForDeletion = previousSortingHashForDeletion;
    this.http.put(ApiEndpoints.SITE_SETTINGS, formText, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        this._siteSettings = res;
      });
  }

  public get siteSettings() {
    return this._siteSettings;
  }

  private fetchSiteSettingsFromDatabase() {
    this.http.get(ApiEndpoints.SITE_SETTINGS).subscribe(res => { // TODO handle errors
      this._siteSettings = null;
      this._siteSettings = res;
    });
  }

  private getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

}
