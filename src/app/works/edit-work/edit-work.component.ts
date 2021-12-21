import { emptyStub } from './../../../services/fillable-form';
import { NewWorkComponent } from './../new-work/new-work.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-work',
  templateUrl: '../new-work/new-work.component.html',
  styleUrls: ['../new-work/new-work.component.css']
})
export class EditWorkComponent extends NewWorkComponent implements OnInit {
  workId: string;
  oldImageSortingHash: string;

  constructor(private route: ActivatedRoute,
    protected backend: BackendService, protected router: Router, private title: Title) {
    super(backend, router)
    title.setTitle('Edit Work - Chinyere Odinukwe')
  }

  actionSuccess() {
    this.successCreatingWork = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.fileData = null; // We need this null bcos we'll use it to chech if we changed pic      

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
    let formText = this.form.value;
    formText.sortingHash = this.oldImageSortingHash;

    let callbackNotifier = this;

    if (this.fileData) { // If I changed the picture
      // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
      let newSortingHash = this.backend.generateUniqueChronoString();

      formText.sortingHash = newSortingHash;
      const formData = new FormData();
      // # acts as separator, so I can split names
      // I need the oldImageSortingHash as well, so I can delete it
      formData.append(newSortingHash + '#' + this.oldImageSortingHash, this.fileData);
      this.backend.uploadImageAndDeleteOld(callbackNotifier, formData);
      callbackNotifier = <any>emptyStub;
    }

    this.backend.updateWork(callbackNotifier, formText, this.workId);
  }

  saveWorkText = "Edit Work";
  saveWorkProgressText = "Saving...";
  successMsg = "Work edited successfully! ";
  failureMsg = "A problem occured while editing your work!";

}
