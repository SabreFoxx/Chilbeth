import { ApiEndpoints } from './../../services/api-endpoints';
import { BackendService } from './../../services/backend.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  newsletters: any;

  constructor(private http: HttpClient, private backend: BackendService) { }

  addContact(formInputJsonContainingEmail) {
    this.http.post(ApiEndpoints.NEWSLETTER, formInputJsonContainingEmail) // TODO handle errors appropriately
      .subscribe(res => {
        alert("You subscribed to our Newsletter successfully!");
      });
  }

  ngOnInit(): void {
    this.http.get(ApiEndpoints.NEWSLETTER, this.backend.getAuthorizationToken()) // TODO handle errors appropriately
      .subscribe(res => this.newsletters = res);
  }

}
