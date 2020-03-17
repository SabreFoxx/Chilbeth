import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuth: AuthService) {

  }

  get isLoggedIn(): boolean {
    return this.userAuth.isLoggedIn;
  }

  ngOnInit() {
  }

}
