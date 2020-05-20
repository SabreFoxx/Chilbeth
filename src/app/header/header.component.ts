import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { SiteSettingsService } from 'src/services/site-settings.service';

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

  ngOnInit() {
  }

  logout() {
    this.userAuth.saveToken('');
  }

}
