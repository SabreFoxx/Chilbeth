import { BackendService } from 'src/services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-landing',
  templateUrl: './blog-landing.component.html',
  styleUrls: ['./blog-landing.component.css']
})
export class BlogLandingComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.fetchBlogs()
      .subscribe(res => {
        console.log(res);
      })
  }

}
