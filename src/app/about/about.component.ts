import { SiteSettingsService } from 'src/services/site-settings.service';
import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private prefix = ApiEndpoints.UPLOADED_FILES + '/big/';
  private postfix = '.jpg';

  constructor(public settings: SiteSettingsService) { }

  public get profilePicture() {
    return this.prefix + this.settings.siteSettings.profilePicture + this.postfix;
  }

  ngOnInit() {
  }

}
