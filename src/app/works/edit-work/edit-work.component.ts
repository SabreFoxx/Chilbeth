import { emptyStub } from './../../../services/fillable-form';
import { NewWorkComponent } from './../new-work/new-work.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-edit-work',
  templateUrl: '../new-work/new-work.component.html',
  styleUrls: ['../new-work/new-work.component.css']
})
export class EditWorkComponent extends NewWorkComponent implements OnInit {

  workId: string;
  oldImageSortingHash: string;

  constructor(private route: ActivatedRoute, protected backend: BackendService, protected router: Router) {
    super(backend, router);
  }

  actionSuccess() {
    this.successCreatingWork = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.paramMap
      .subscribe(params => {
        this.workId = params.get("workid");
        this.backend.fetchWork(this.workId)
          .subscribe(res => {
            this.oldImageSortingHash = res.imageSortHash;
            this.form.get("title").setValue(res.title);
            this.form.get("desc").setValue(res.desc);
            this.form.get("category").setValue(res.categoryId);
            this.form.get("featured").setValue(res.isFeatured);
            this.previewUrl = this.backend.uploadsUrlPrefix + "/big/" + res.imageSortHash + ".jpg";
          });
      });
  }

  onSubmit() {
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    // # acts as separator, so I can split names
    // I need the oldImageSortingHash as well, so I can delete it
    formData.append(sortingHash + '#' + this.oldImageSortingHash, this.fileData);
    this.backend.uploadImageAndDeleteOld(this, formData);

    let formText = this.form.value;
    formText.sortingHash = sortingHash;
    this.backend.updateWork(emptyStub, formText, this.workId);
  }

  saveWorkText = "Edit Work";
  saveWorkProgressText = "Saving...";
  successMsg = "Work edited successfully! ";
  failureMsg = "A problem occured while editing your work!";

}
