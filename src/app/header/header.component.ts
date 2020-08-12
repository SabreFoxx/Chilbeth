import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { SiteSettingsService } from 'src/services/site-settings.service';
import { ApiEndpoints } from 'src/services/api-endpoints';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public settings: SiteSettingsService, private userAuth: AuthService) { }

  get isLoggedIn(): boolean {
    return this.userAuth.isAuthenticated;
  }

  get logo() {
    return ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.siteLogo + '.png';
  }

  get facebook() {
    return this.settings.siteSettings.facebook;
  }

  get twitter() {
    return this.settings.siteSettings.twitter;
  }

  get youtube() {
    return this.settings.siteSettings.youtube;
  }

  get instagram() {
    return this.settings.siteSettings.instagram;
  }

  get workCategories() {
    return this.settings.workCategories;
  }

  /**
   * Do I need to trigger the toggle for nav menu expand and collapse?
   * I only need this for mobile devices.
   */
  get shouldItoggleCollapse() {
    if (window.innerWidth < 768)
      return 'collapse';
    else return '';
  }

  ngOnInit() {
  }

  logout() {
    this.userAuth.saveToken('');
  }

}
