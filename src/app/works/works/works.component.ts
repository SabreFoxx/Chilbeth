import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { BackendService } from 'src/services/backend.service';
import { ActivatedRoute } from '@angular/router';

const defaultTitle = "Featured Works";

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  pageTitle = "Featured Works";
  backendUrl: string = ApiEndpoints.WORK;
  groupOne;
  groupTwo;

  // Stores the work categories we will list
  workCategories: Array<any>;

  private activeCarousel = 1;

  constructor(private route: ActivatedRoute, private forceChange: ChangeDetectorRef, public backend: BackendService) {
    this.route.params
      .subscribe(params => {
        // Update the url if the user visited links like www.site.com/works/this_is_category_id
        this.backendUrl = params["category"] ? ApiEndpoints.WORK + `/${params["category"]}` : ApiEndpoints.WORK;
      });
  }

  // Will be called by PaginationComponent, when this component's model is ready
  receivePageContent(data: any[]) {
    this.groupOne = this.groupTwo = null;
    this.groupOne = data.slice(0, 3);
    this.groupTwo = data.slice(3, 6);
    data = [];
  }

  ngOnInit(): void {
    // Fetch the categories
    this.backend.fetchWorkCategories()
      .subscribe(res => {
        this.workCategories = res

        // Subscribe to route parameter, and use it to change the page title if it changes
        this.route.params
          .subscribe(params => {
            if (params["category"] != '') {
              let namingCategory = null;
              namingCategory = this.workCategories.find((category) => {
                return category._id == params["category"];
              });
              this.pageTitle = namingCategory ? namingCategory.title : defaultTitle;
            } else
              this.pageTitle = defaultTitle;
          });
      });
  }
}
