import { NewsletterComponent } from './../../newsletter/newsletter.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  newsletterForm = new FormGroup({
    email: new FormControl()
  });
  newsletter: NewsletterComponent; // For quick access to method


  disableSubmitButtonForNewsletterForm = false;

  constructor(private http: HttpClient, private backend: BackendService) {
    this.newsletter = new NewsletterComponent(http, backend);
  }

  clear() {
    this.newsletterForm.get("email").setValue(null);
  }

  ngOnInit(): void {
  }

  addContact() {
    this.newsletter.addContact(this.newsletterForm.value);
    this.clear();
  }

}
