import { BackendService } from './../../services/backend.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  // Stores page information from server
  pageInformation: {
    itemsFetched,
    itemsPerPage,
    grandTotalNumberOfItems,
    currentPageNumber,
    totalNumberOfPages
  };

  // Stores numbered numeric links of pages
  numericLinks: [number];

  @Input()
  set pageUrl(url: string) {
    this.route.paramMap
      .subscribe(params => {
        this.pageNumber = params.get("page") ? +params.get("page") : 1;
        this.backend.performSimpleGet(`${url}/p/${this.pageNumber}`)
          .subscribe(res => {
            this.pageInformation = res.pageInformation;
            this.buildNumericPageLinks();
            this.pagedData.emit(res.items);
          })
      });
  }

  @Output() pagedData = new EventEmitter();
  pageNumber: number;

  constructor(private route: ActivatedRoute, private backend: BackendService) {
    this.pageInformation = {
      itemsFetched: 0,
      itemsPerPage: 0,
      grandTotalNumberOfItems: 0,
      currentPageNumber: 0,
      totalNumberOfPages: 0
    };
    this.numericLinks = [0];
  }

  buildNumericPageLinks() {
    this.numericLinks = [0];
    for (let x = (this.pageInformation.currentPageNumber - this.pageInformation.totalNumberOfPages);
      x < ((this.pageInformation.currentPageNumber + this.pageInformation.totalNumberOfPages) + 1); x++) {
        this.numericLinks.push(x);
    }
  }

  get halfWayThroughThePages() {
    return Math.ceil(this.pageInformation.totalNumberOfPages / 2);
  }

  ngOnInit(): void {
  }

}
