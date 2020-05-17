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

  ngOnInit() {
  }

  logout() {
    this.userAuth.saveToken('');
  }

}
