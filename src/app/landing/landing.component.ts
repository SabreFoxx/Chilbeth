import { SiteSettingsService } from 'src/services/site-settings.service';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  imagesUrlPrefix = ApiEndpoints.UPLOADED_FILES;
  cvUrlPrefix = ApiEndpoints.CV;

  constructor(public settings: SiteSettingsService, private title: Title) {
    title.setTitle('Chinyere Odinukwe')
  }

  get name() {
    return this.settings.siteSettings.name;
  }

  get landingMessageHeading() {
    return this.settings.siteSettings.landingMessageHeading;
  }

  get landingMessage() {
    return this.settings.siteSettings.landingMessage;
  }

  get occupation() {
    return this.settings.siteSettings.occupation;
  }
  
  get desc() {
    return this.settings.siteSettings.desc;
  }

  ngOnInit() {
  }

}
