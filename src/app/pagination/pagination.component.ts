import { BackendService } from './../../services/backend.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  // Stores the page numbers
  numericLinks: [number];

  // Matches the /p/23 in http://site.com:3000/blaa/blaa/xjfjiels/p/23
  regexForTrimingPagingInUrl = /\/p\/[1-9][0-9]*/i;

  @Output() pagedData = new EventEmitter(); // Send event to the display component
  pageNumber: number; // Stores current page number
  actionUrl: string;

  @Input()
  set pageUrl(backendUrl: string) {
    if (backendUrl != null)
      this.route.paramMap
        .subscribe(params => {
          // Save front-end base url
          this.actionUrl = this.router.url.replace(this.regexForTrimingPagingInUrl, "");
          // Get current page number
          this.pageNumber = params.get("page") ? +params.get("page") : 1;
          // Fetch data in current page
          this.backend.performSimpleGet(`${backendUrl}/p/${this.pageNumber}`)
            .subscribe(res => {
              if (res != null) {
                this.pageInformation = res.pageInformation; // Metadata describing pages
                this.buildNumericPageLinks();
                this.pagedData.emit(res.items); // Send page content to the display component
              }
            });
        });
  }

  constructor(private route: ActivatedRoute, private backend: BackendService, private router: Router) {
    // Empty initializations
    this.pageInformation = {
      itemsFetched: 0,
      itemsPerPage: 0,
      grandTotalNumberOfItems: 0,
      currentPageNumber: 0,
      totalNumberOfPages: 0
    };
    this.numericLinks = [null];
    this.actionUrl = '';
  }

  // Generates the page numbers, and stores them in an array
  // Note that this does not deal with the previous and next arrows we see in pages, just the numbers
  buildNumericPageLinks() {
    this.numericLinks.splice(0, this.numericLinks.length); // Discard all previously generated numbers
    let temp: number[] = [];
    for (let x = (this.pageInformation.currentPageNumber - this.pageInformation.totalNumberOfPages);
      x < ((this.pageInformation.currentPageNumber + this.pageInformation.totalNumberOfPages) + 1); x++) {
      temp.push(x);
    }
    // Filter away all negative numbers stored in our temp variable, then store the rest in numericLinks
    for (let x in temp)
      if ((+x > 0) && (x <= this.pageInformation.totalNumberOfPages))
        this.numericLinks.push(+x); // +x casts x to number
  }

  // Returns a page number that is half of all the pages
  get halfWayThroughThePages() {
    return Math.ceil(this.pageInformation.totalNumberOfPages / 2);
  }

  ngOnInit(): void {
  }

}
