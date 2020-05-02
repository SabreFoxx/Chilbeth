import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-work-special-pagination',
  templateUrl: './work-special-pagination.component.html',
  styleUrls: ['./work-special-pagination.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush // Set so that this.activeCarousel will not be updated needlessly
})
export class WorkSpecialPaginationComponent implements OnInit {

  /* See the commit "About to stop using work-special-pagination.component.ts" "27350e14d427f1b2c5a059763cacace750637529" */

  /*
  * WorkSpecialPaginationComponent is similar to our regular pagination, the only difference is
  * that after generating the page numbers, we generate two page numbers for each of our page numbers.
  * Thus, after calling buildNumericPageLinks() and we get page numbers 3, 4, 5, our paging will be
  * transformed to 3, 4, 5, 6, 7, 8, where 5 and 6 for example, are under 4 in our original page numbers.
  * It's done this way so that, when we fetch data for a particular page number say page number 5, we
  * will display it in address mysite.com/work/p/5, and page buttons 7 and 8 will be a bootstrap carousel
  * of whatever is in page 5, but splitted into two so we have a carousel.
  * We will now have an addresses like mysite.com/work/p/5/1 and mysite.com/work/p/5/2 where the 1 shows
  * we are in the first slide, and the 2 shows we are in the second slide.
  */

  /*
  * Adapted from pagination.component.ts without inheritance
  */

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
  // When our page numbers which are stored in numericLinks as 1, 2, 3 are transformed
  // to 1, 2, 3, 4, 5, 6, store those new numbers in splittedNumericLinks
  splittedNumericLinks: [any];
  @Output() pagedData = new EventEmitter(); // Sends event to the display component
  @Output() sendActiveCarousel = new EventEmitter(); // Sends content of this.activeCarousel to the display component
  pageNumber: number; // Stores current page number
  activeCarousel: number; // Are we in the first slide or the second slide of a page number? Store that info here

  @Input()
  set pageUrl(url: string) {
    this.route.paramMap
      .subscribe(params => {
        // Get current page number
        this.pageNumber = params.get("page") ? +params.get("page") : 1;
        // /1 and /2 at the end of the link helps us set the right <li> with Bootstrap ".active" class
        // when the page is loaded, since the two items have the same page number in this.numericLinks
        // We store the needed information in this.activeCarousel
        this.activeCarousel = params.get("whichCarouselIsActive") ? +params.get("whichCarouselIsActive") : 1;
        // Fetch data in current page
        this.backend.performSimpleGet(`${url}/p/${this.pageNumber}`)
          .subscribe(res => {
            this.pageInformation = res.pageInformation; // Metadata describing pages
            this.buildNumericPageLinks();
            this.splitNumericPageLinks();
            this.sendActiveCarousel.emit(this.activeCarousel); // Send this.activeCarousel to the display component
            this.pagedData.emit(res.items); // Send page content to the display component
          });
      });
  }

  constructor(private router: Router, private route: ActivatedRoute, private backend: BackendService) {
    // Empty initializations
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

  // Given numbers 4, 5, 6 in this.numericLinks, split them to 4, 5, 6, 7, 8, 9
  // And store them in this.splittedNumericLinks
  splitNumericPageLinks() {
    this.splittedNumericLinks.splice(0, this.splittedNumericLinks.length); // Discard all previously generated numbers
    for (let i = 0; i < this.numericLinks.length; i++) {
      let adder = this.numericLinks[i] - 1;
      this.splittedNumericLinks[this.numericLinks[i]] = [adder + this.numericLinks[i], ++adder + this.numericLinks[i]];
    }
  }

  // Returns true during pagination link building, when the loop reaches the current page the browser is visiting
  isCurrentPage(currentPageNumber: number): boolean {
    return currentPageNumber === this.pageNumber;
  }

  // Returns true if the first carousel should have the ".active" Bootstrap class
  get carouselOneActive(): boolean {
    return this.activeCarousel === 1;
  }

  // Returns true if the second carousel should have the ".active" Bootstrap class
  get carouselTwoActive(): boolean {
    return this.activeCarousel === 2;
  }

  getFirstSplittedPageNumberOfPageNum(pageNumber: number): number {
    // The try-catch block is just for dismissing any 'undefined' errors
    try {
      return this.splittedNumericLinks[pageNumber][0];
    } catch (e) {
      return 0;
    }
  }

  getSecondSplittedPageNumberOfPageNum(pageNumber: number): number {
    try {
      return this.splittedNumericLinks[pageNumber][1];
    } catch (e) {
      return 0;
    }
  }

  navigate(num, active) {
    // Reset some settings
    this.activeCarousel = 0;
    this.sendActiveCarousel.emit(1); // Change this.activeCarousel to 1 for the display component, ahead of time
    
    // Navigate
    this.router.navigateByUrl(`/works/p/${num}/${active}`);
  }

  navigate_(num, active) {
    // Reset some settings
    this.activeCarousel = 0;

    // Navigate
    this.router.navigateByUrl(`/works/p/${num}/${active}`);
  }

  ngOnInit(): void {
  }

  // Pro tip: In {[i]: "foo"}, [i] sets the content of the variable i, as the key name of the object
}
