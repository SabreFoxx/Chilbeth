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
  groupThree;
  groupFour;

  private activeCarousel = 1;

  constructor(private forceChange: ChangeDetectorRef, private backend: BackendService) { }

  receivePageContent(data: any[]) {
    this.groupOne = data.slice(0, 3);
    this.groupTwo = data.slice(3, 6);
    this.groupThree = data.slice(6, 9);
    this.groupFour = data.slice(9);
    data = [];
  }

  receiveActiveCarousel(activeCarousel: number) {
    this.activeCarousel = activeCarousel;
    this.forceChange.markForCheck();
  }

  // Returns true if the first carousel should have the ".active" Bootstrap class
  get carouselOneActive(): boolean {
    return this.activeCarousel === 1;
  }

  // Returns true if the second carousel should have the ".active" Bootstrap class
  get carouselTwoActive(): boolean {
    return this.activeCarousel === 2;
  }

  ngOnInit(): void {
  }

}
