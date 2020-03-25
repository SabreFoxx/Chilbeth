import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-work-special-pagination',
  templateUrl: './work-special-pagination.component.html',
  styleUrls: ['./work-special-pagination.component.css']
})
export class WorkSpecialPaginationComponent implements OnInit {

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

  splittedNumericLinks: [any];
  @Output() pagedData = new EventEmitter();
  pageNumber: number;
  activeCarousel: number;

  @Input()
  set pageUrl(url: string) {
    this.route.paramMap
      .subscribe(params => {
        this.pageNumber = params.get("page") ? +params.get("page") : 1;
        this.activeCarousel = params.get("whichCarouselIsActive") ? +params.get("whichCarouselIsActive") : 1;
        this.backend.performSimpleGet(`${url}/p/${this.pageNumber}`)
          .subscribe(res => {
            this.pageInformation = res.pageInformation;
            this.buildNumericPageLinks();
            this.splitNumericPageLinks();
            this.pagedData.emit(res.items);
          })
      });
  }

  constructor(private route: ActivatedRoute, private backend: BackendService) {
    this.pageInformation = {
      itemsFetched: 0,
      itemsPerPage: 0,
      grandTotalNumberOfItems: 0,
      currentPageNumber: 0,
      totalNumberOfPages: 0
    };
    this.numericLinks = [null];
    this.splittedNumericLinks = [null];
  }

  buildNumericPageLinks() {
    this.numericLinks.splice(0, this.numericLinks.length);
    let temp: number[] = [];
    for (let x = (this.pageInformation.currentPageNumber - this.pageInformation.totalNumberOfPages);
      x < ((this.pageInformation.currentPageNumber + this.pageInformation.totalNumberOfPages) + 1); x++) {
      temp.push(x);
    }
    // Filter away all negative numbers stored in our temp variable, and store the rest
    for (let x in temp)
      if ((+x > 0) && (x <= this.pageInformation.totalNumberOfPages))
        this.numericLinks.push(+x); // +x casts x to number
  }

  splitNumericPageLinks() {
    this.splittedNumericLinks.splice(0, this.splittedNumericLinks.length);
    for (let i = 0; i < this.numericLinks.length; i++) {
      let adder = this.numericLinks[i] - 1;
      this.splittedNumericLinks[this.numericLinks[i]] = [adder + this.numericLinks[i], ++adder + this.numericLinks[i]]
    }
  }
  
  // Returns true during pagination link building, when the loop reaches the current page
  isCurrentPage(currentPageNumber: number): boolean {
    return currentPageNumber === this.pageNumber;
  }

  // Returns true if the first carousel should have the active Bootstrap class
  get carouselOneActive(): boolean {
    return this.activeCarousel === 1;
  }

  // Returns true if the second carousel should have the active Bootstrap class
  get carouselTwoActive(): boolean {
    return this.activeCarousel === 2;
  }
  
  ngOnInit(): void {
  }
  
  // Pro tip: In {[i]: "foo"}, [i] sets the content of the variable i, as the key name of the object
}
