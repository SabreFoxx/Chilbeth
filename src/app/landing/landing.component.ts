import { ApiEndpoints } from 'src/services/api-endpoints';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  imagesUrlPrefix = ApiEndpoints.UPLOADED_FILES

  constructor() { }

  ngOnInit() {
  }

}
