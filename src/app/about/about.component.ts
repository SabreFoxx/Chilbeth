import { SiteSettingsService } from 'src/services/site-settings.service';
import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  cvUrlPrefix = ApiEndpoints.CV;

  constructor(public settings: SiteSettingsService) { }

  public get profilePicture() {
    let prefix = ApiEndpoints.UPLOADED_FILES + '/big/';
    let postfix = '.jpg';
    return prefix + this.settings.siteSettings.profilePicture + postfix;
  }

  get about_heading() {
    return this.settings.siteSettings.about_heading;
  }

  get about() {
    return this.settings.siteSettings.about;
  }

  ngOnInit() {
  }

}
