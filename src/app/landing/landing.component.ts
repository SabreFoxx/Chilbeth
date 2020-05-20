import { SiteSettingsService } from 'src/services/site-settings.service';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  imagesUrlPrefix = ApiEndpoints.UPLOADED_FILES

  constructor(public settings: SiteSettingsService) { }

  get name() {
    return this.settings.siteSettings.name;
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
