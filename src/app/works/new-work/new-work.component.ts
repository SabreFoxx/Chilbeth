import { BackendService } from './../../../services/backend.service';
import { FillableForm } from 'src/services/fillable-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.css']
})
export class NewWorkComponent implements OnInit, FillableForm {

  successCreatingWork = false;
  failedCreatingWork = false;
  disableSubmitButton = false;
  displayNoCategoriesMessage = false;

  categories: Array<any>;

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required)
  });

  fileData: File = null;
  previewUrl: any = null; // Stores base64 data we use to preview the image in browser prior to upload

  constructor(public backend: BackendService, private router: Router) { }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

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
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  resetAlert() {
    // Reset alert dialogs
    this.successCreatingWork = false;
    this.failedCreatingWork = false;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.fileData);
    this.backend.uploadArtworkImage(this, formData);

    let formText = this.form.value;
    formText.sortingHash = sortingHash;
    if (!formText.category)
      formText.category = this.categories[0]; // Set default fallback
    this.backend.addWork(this, formText);
  }

  ngOnInit(): void {
    this.backend.fetchWorkCategories()
      .subscribe(res => {
        this.categories = res;
        if (this.categories.length < 1)
          this.displayNoCategoriesMessage = true;
      });
  }

}
