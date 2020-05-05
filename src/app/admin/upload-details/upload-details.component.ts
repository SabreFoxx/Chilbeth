import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';
import { Router } from '@angular/router';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {

  /* Alert flags */
  successCreatingBlog = false;
  failedCreatingBlog = false;
  disableSubmitButton = false;

  // Points to an area of interest
  _pointer: any;

  /* For regular form */
  form = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required)
  });

  // For the landing images; they are three
  fileData: File[] = [null, null, null];
  previewUrl: any[] = [null, null, null];

  constructor(private backend: BackendService, private router: Router) { }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

  actionFailed() {
    this.failedCreatingBlog = true; // Shows failure alert
  }

  actionSuccess() {
    this.successCreatingBlog = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    // Empties the form
    this.form.get('title').setValue('');
    this.form.get('desc').setValue('');
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  resetAlert() {
    // Resets alert dialogs
    this.successCreatingBlog = false;
    this.failedCreatingBlog = false;
  }

  fileProgress(fileInput: any, landingImageIndex: number) {
    console.log('foo', landingImageIndex)
    this.fileData[landingImageIndex] = <File>fileInput.target.files[0];
    this.preview(landingImageIndex);
  }

  preview(landingImageIndex: number) {
    // Show image preview 
    let mimeType = this.fileData[landingImageIndex].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData[landingImageIndex]);
    reader.onload = (_event) => {
      this.previewUrl[landingImageIndex] = reader.result;
    }
  }

  uploadLandingImage(landingImageIndex: number) {
    this._pointer = landingImageIndex;
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.fileData[landingImageIndex]);
    this.backend.uploadImage(this, formData);

    // TODO add record to backend
  }

  ngOnInit(): void {
  }

}
