import { ApiEndpoints } from './../../../services/api-endpoints';
import { BackendService } from './../../../services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  recentBlogs;

  constructor(public backend: BackendService) { }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  ngOnInit(): void {
    this.backend.performSimpleGet(ApiEndpoints.BLOG + "/recent")
      .subscribe(res => this.recentBlogs = res.items);
  }

}
