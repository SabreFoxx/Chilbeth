import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  url = ApiEndpoints.WORK;
  private groupOne;
  private groupTwo;
  private groupThree;
  private groupFour;

  constructor(private backend: BackendService) { } // Leave private backend: BackendService here

  receivePageContent(data: any[]) {
    // We are going to receive at most 12 items here (based on the settings of the backend)
    // So, we should split them into groups of three's, so we can show a carousel with groups of six, three in a row
    // I should use a multidimensional array of one group, but I'm tired. Will refactor later and reduce the repetition in works.comp.html

    // If we received less than 12 items, fill up the array
    if (data.length < 12)
      for (let x = data.length; x < 12; x++)
        data[x] = null;

    this.groupOne = data.slice(0, 3);
    this.groupTwo = data.slice(3, 6);
    this.groupThree = data.slice(6, 9);
    this.groupFour = data.slice(9);
    console.log(data);
    data = [];
  }

  ngOnInit(): void {
  }

}
