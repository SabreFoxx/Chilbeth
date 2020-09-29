import { NewWorkComponent } from './../new-work/new-work.component';
import { Component, OnInit } from '@angular/core';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { emptyStub } from 'src/services/fillable-form';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-exhibition',
  templateUrl: './new-exhibition.component.html',
  styleUrls: ['./new-exhibition.component.css']
})
export class NewExhibitionComponent extends NewWorkComponent implements OnInit {
  actionFailed() {
    this.failedCreatingWork = true; // Shows failure alert
  }

  actionSuccess() {
    this.successCreatingWork = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    // Empty the form
    this.fileData = null;
    this.previewUrl = null;
    this.previewUrl = '';
    this.form.get('title').setValue('');
    this.form.get('desc').setValue('');
    this.form.get('videoUrl').setValue('');
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  resetAlert() {
    // Reset alert dialogs
    this.successCreatingWork = false;
    this.failedCreatingWork = false;
  }

  onSubmit() {
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.fileData);
    this.backend.uploadArtworkImage(this, formData);

    let formText = this.form.value;
    formText.sortingHash = sortingHash;
    this.backend.addExhibition(emptyStub, formText);
  }

  ngOnInit(): void {
    this.form.addControl("videoUrl", new FormControl("", Validators.required));
  }

  saveWorkText = "Upload Exhibition"; // This is a variable, because NewWorkComponent will be inherited
  // by EditWorkComponent
  saveWorkProgressText = "Uploading..."
  successMsg = "Exhibition uploaded successfully! ";
  failureMsg = "A <b>problem</b> occured while adding your exhibition, so it wasn't added successfully!";

}
