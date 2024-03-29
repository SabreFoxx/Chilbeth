import { ApiEndpoints } from 'src/services/api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FillableForm } from './fillable-form';

interface SiteSettingsInterface {
  siteLogo,
  landingImageOne,
  landingImageTwo,
  landingImageThree,
  landingImageFour,
  landingImageFive,
  previousImageForDeletion,
  profilePicture,
  profileThumbnail,
  curriculumVitae,

  name,
  occupation,
  desc,
  landingMessageHeading,
  landingMessage,
  aboutHeading,
  about,
  phone,
  email,
  facebook,
  twitter,
  youtube,
  instagram,
  city,
  district,
  country,
  openingTimes
}

/* SiteSettings is the general site settings for both authenticated and unauthenticated users. For example, what is the landing page's image? */
@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  private _siteSettings: any = null;
  private _workCategories: Array<any> = null;

  private settingsTemplate: SiteSettingsInterface = {
    siteLogo: '',
    landingImageOne: '',
    landingImageTwo: '',
    landingImageThree: '',
    landingImageFour: '',
    landingImageFive: '',
    previousImageForDeletion: '',
    profilePicture: '',
    profileThumbnail: '',
    curriculumVitae: '',

    name: '',
    occupation: '',
    desc: '',
    landingMessageHeading: '',
    landingMessage: '',
    aboutHeading: '',
    about: '',
    phone: '',
    email: '',
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: '',
    city: '',
    district: '',
    country: '',
    openingTimes: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    // The constructor is run only once for a singleton object
    if (this._siteSettings === null) { // Fill in
      let blank = { // Serve the blank image as placeholder initially, while we wait to fetch the real ones from the database
        siteLogo: 'blank/blank',
        landingImageOne: 'blank/blank',
        landingImageTwo: 'blank/blank',
        landingImageThree: 'blank/blank',
        profilePicture: 'blank/blank',
        profileThumbnail: 'blank/blank'
      };
      // Set the defaults for _siteSettings prior to fetching them from the database
      this._siteSettings = { ...this.settingsTemplate, ...blank } // Combine them, using the spread operator
      this.fetchSiteSettingsFromDatabase();
    }
  }

  public saveSiteLogo(sortingHash: string, previousSortingHashForDeletion: string) {
    let formText = this.settingsTemplate;
    formText.siteLogo = sortingHash;
    formText.previousImageForDeletion = previousSortingHashForDeletion;
    this.http.put(ApiEndpoints.SITE_SETTINGS, formText, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        this._siteSettings = res;
      });
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
      case 3:
        formText.landingImageFour = sortingHash;
        break;
      case 4:
        formText.landingImageFive = sortingHash;
        break;
    }
    formText.previousImageForDeletion = previousSortingHashForDeletion;
    this.http.put(ApiEndpoints.SITE_SETTINGS, formText, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        this._siteSettings = res;
      });
  }

  public saveProfile(sortingHash: string, type: string, previousSortingHashForDeletion: string) {
    let formText = this.settingsTemplate;
    switch (type) {
      case 'profilePicture':
        formText.profilePicture = sortingHash;
        break;
      case 'thumbnail':
        formText.profileThumbnail = sortingHash;
        break;
      case 'curriculumVitae':
        formText.curriculumVitae = sortingHash;
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

  public get workCategories() {
    return this._workCategories;
  }

  public saveSiteSettings(initiatingContainer: FillableForm, formData) {
    let formText = { ...this.settingsTemplate, ...formData } // Combine them using the spread operator
    initiatingContainer.actionPending();
    this.http.put(ApiEndpoints.SITE_SETTINGS, formText, this.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => {
        this._siteSettings = res;
        initiatingContainer.actionSuccess();
      });
  }

  private fetchSiteSettingsFromDatabase() {
    this.http.get(ApiEndpoints.SITE_SETTINGS).subscribe(res => { // TODO handle errors
      this._siteSettings = null;
      this._siteSettings = res;
    });
    this.http.get(ApiEndpoints.WORK_CATEGORIES).subscribe(res => { // TODO handle errors
      this._workCategories = null;
      (this._workCategories as any) = res;
    });
  }

  public refreshSiteSettings() {
    this.fetchSiteSettingsFromDatabase();
  }

  private getAuthorizationToken(): any {
    return { headers: { "Authorization": "Bearer " + this.authService.getToken() } };
  }

}
