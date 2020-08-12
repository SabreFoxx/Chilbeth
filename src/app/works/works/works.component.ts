import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { BackendService } from 'src/services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  pageTitle = "Featured Works";
  customPageTitleCategoryId: string; // Stores the id of the category which we will get the page title
  url: string = ApiEndpoints.WORK;
  groupOne;
  groupTwo;

  // Stores the work categories we will list
  workCategories: Array<any>;

  private activeCarousel = 1;

  constructor(private route: ActivatedRoute, private forceChange: ChangeDetectorRef,
    private router: Router, public backend: BackendService) {
    this.route.paramMap
      .subscribe(params => {
        // Update the url if the user visited links like www.site.com/works/this_is_category_id
        let categoryId;
        if (categoryId = params.get("category")) {
          this.url = ApiEndpoints.WORK + `/${categoryId}`;
          this.customPageTitleCategoryId = categoryId;
        } else
          this.customPageTitleCategoryId = null;
      });
  }

  // Will be called by PaginationComponent, when this component's model is ready
  receivePageContent(data: any[]) {
    this.groupOne = data.slice(0, 3);
    this.groupTwo = data.slice(3, 6);
    data = [];
  }

  ngOnInit(): void {
    // Fetch work categories
    this.backend.fetchWorkCategories()
      .subscribe(res => {
        this.workCategories = res;
        if (this.customPageTitleCategoryId) {
          let namingCategory = this.workCategories.find((category) => {
            return category._id == this.customPageTitleCategoryId;
          });
          this.pageTitle = namingCategory.title;
        }
      });
  }

  navigateTo(category) {
    this.pageTitle = category.title;
    this.router.navigateByUrl(`/works/${category._id}/p/1`);
  }

}
