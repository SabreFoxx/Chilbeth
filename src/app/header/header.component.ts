import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuth: AuthService) {

  }

  isLoggedIn(): boolean {
    return this.userAuth.isLoggedIn;
  }

  ngOnInit() {
  }

}
