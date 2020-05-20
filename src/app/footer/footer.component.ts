import { Component, OnInit } from '@angular/core';
import { SiteSettingsService } from 'src/services/site-settings.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public settings: SiteSettingsService) { }

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

}
