import { NewExhibitionComponent } from './../new-exhibition/new-exhibition.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { emptyStub } from 'src/services/fillable-form';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-exhibition',
  templateUrl: '../new-exhibition/new-exhibition.component.html',
  styleUrls: ['../new-exhibition/new-exhibition.component.css']
})
export class EditExhibitionComponent extends NewExhibitionComponent implements OnInit {
  exhibitionId: string;
  oldImageSortingHash: string;

  constructor(private route: ActivatedRoute,
    protected backend: BackendService,
    protected router: Router, protected title: Title) {
    super(backend, router)
    title.setTitle('Edit Exhibition - Chinyere Odinukwe')
  }

  actionSuccess() {
    this.successCreatingWork = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  ngOnInit(): void {
    this.fileData = null; // We need this null bcos we'll use it to chech if we changed pic
    super.ngOnInit();

    this.route.paramMap
      .subscribe(params => {
        this.exhibitionId = params.get("exhibitionid");
        this.backend.fetchExhibition(this.exhibitionId)
          .subscribe(res => {
            this.oldImageSortingHash = res.imageSortHash;
            this.form.get("title").setValue(res.title);
            this.form.get("desc").setValue(res.desc);
            this.form.get("videoUrl").setValue(res.videoUrl);
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

    this.backend.updateExhibition(callbackNotifier, formText, this.exhibitionId);
  }

  saveWorkText = "Edit Exhibition";
  saveWorkProgressText = "Saving...";
  successMsg = "Exhibition edited successfully! ";
  failureMsg = "A problem occured while editing your content!";

}
