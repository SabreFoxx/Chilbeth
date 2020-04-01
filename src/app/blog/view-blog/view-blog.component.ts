import { BackendService } from 'src/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  blogId: string;
  blog;

  constructor(private route: ActivatedRoute, public backend: BackendService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.blogId = params.get("blogid");
        this.backend.fetchBlog(this.blogId)
          .subscribe(res => this.blog = res);
      });
  }

}
