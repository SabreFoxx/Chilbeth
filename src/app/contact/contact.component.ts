import { Component, OnInit } from '@angular/core';
import { SiteSettingsService } from 'src/services/site-settings.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public settings: SiteSettingsService) { }

  get phone() {
    return this.settings.siteSettings.phone;
  }

  get email() {
    return this.settings.siteSettings.email;
  }

  get city() {
    return this.settings.siteSettings.city;
  }

  get district() {
    return this.settings.siteSettings.district;
  }

  get country() {
    return this.settings.siteSettings.country;
  }

  get openingTimes() {
    return this.settings.siteSettings.openingTimes;
  }

  ngOnInit(): void {
  }

}
