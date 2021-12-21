import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent implements OnInit {
  pageTitle = "Exhibitions";
  backendUrl: string = ApiEndpoints.EXHIBITION;
  groupOne;
  groupTwo;

  private activeCarousel = 1;

  constructor(private route: ActivatedRoute, private forceChange: ChangeDetectorRef,
    public backend: BackendService, private title: Title) {
      title.setTitle('Exhibitions - Chinyere Odinukwe')
    }

  // Will be called by PaginationComponent, when this component's model is ready
  receivePageContent(data: any[]) {
    this.groupOne = this.groupTwo = null;
    this.groupOne = data.slice(0, 3);
    this.groupTwo = data.slice(3, 6);
    data = [];
  }

  ngOnInit(): void {

  }
}
