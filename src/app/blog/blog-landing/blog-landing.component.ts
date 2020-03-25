import { BackendService } from 'src/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';

@Component({
  selector: 'app-blog-landing',
  templateUrl: './blog-landing.component.html',
  styleUrls: ['./blog-landing.component.css']
})
export class BlogLandingComponent implements OnInit {

  url = ApiEndpoints.BLOG;
  private blogs: any;

  constructor(private backend: BackendService) { } // Leave private backend: BackendService here

  receivePageContent(data: any) {
    this.blogs = data;
  }

  ngOnInit() {
    
  }

}
