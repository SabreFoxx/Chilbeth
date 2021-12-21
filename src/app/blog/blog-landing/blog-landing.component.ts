import { BackendService } from 'src/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-landing',
  templateUrl: './blog-landing.component.html',
  styleUrls: ['./blog-landing.component.css']
})
export class BlogLandingComponent implements OnInit {

  backendUrl = ApiEndpoints.BLOG;
  blogs: any;

  constructor(public backend: BackendService, private title: Title) {
    title.setTitle('Blog - Chinyere Odinukwe')
  }

  // Will be called by PaginationComponent, when this component's model is ready
  receivePageContent(data: any) {
    this.blogs = data;
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  ngOnInit(): void {

  }

}
