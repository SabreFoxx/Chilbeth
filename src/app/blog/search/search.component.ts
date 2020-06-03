import { UrlBuilderService } from './../../../services/url-builder.service';
import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { BackendService } from 'src/services/backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup({
    terms: new FormControl()
  });

  blogs: any;
  disableSubmitButton = false;

  constructor(public backend: BackendService) {
    this.blogs = null;
  }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

  stopSpinAnimation() {
    this.disableSubmitButton = false;
  }

  clear() {
    this.blogs = null;
  }

  onSubmit() {
    if (this.searchForm.get("terms").value.length > 2) {
      this.actionPending();
      let urlQuerySubstring = UrlBuilderService.buildUrlQuery({ terms: this.searchForm.get("terms").value });
      this.backend.performSimpleGet(ApiEndpoints.BLOG + '/search?' + urlQuerySubstring)
        .subscribe(res => {
          if (res)
            this.blogs = res;
          this.searchForm.get("terms").setValue('');
          this.stopSpinAnimation();
        });
    } else
      this.blogs = null;
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  ngOnInit(): void {
  }

}
