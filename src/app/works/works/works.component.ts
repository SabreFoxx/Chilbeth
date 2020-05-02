import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  url = ApiEndpoints.WORK;
  groupOne;
  groupTwo;

  private activeCarousel = 1;

  constructor(private forceChange: ChangeDetectorRef, public backend: BackendService) { }

  receivePageContent(data: any[]) {
    this.groupOne = data.slice(0, 3);
    this.groupTwo = data.slice(3, 6);
    data = [];
  }

  ngOnInit(): void {
  }

}
