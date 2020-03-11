import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-view-work',
  templateUrl: './view-work.component.html',
  styleUrls: ['./view-work.component.css']
})
export class ViewWorkComponent implements OnInit {

  constructor(private userAuth: AuthService) { }

  isLoggedIn(): boolean {
    return this.userAuth.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
