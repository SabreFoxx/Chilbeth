import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';
import { Router } from '@angular/router';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { SiteSettingsService } from 'src/services/site-settings.service';
import { ApiEndpoints } from 'src/services/api-endpoints';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {

  /* Alert flags */
  operationSuccessful = false;
  operationFailed = false;
  disableSubmitButton = false;

  // Points to an area of interest in HTML template
  _pointer: any;
  _logoPointer: any;
  _bioPointer: any;

  /* For regular form */
  form = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required)
  });

  // For the landing images; they are three
  fileData: File[] = [null, null, null];
  // previewUrl stores base64 data we use to preview the image in browser prior to upload
  // But initially, we'll store a http url to the file of the current landing page images
  previewUrl: any[];
  oldSortingHash: string[];

  // Site logo
  logoFileData;
  logoPreviewUrl;
  logoOldSortingHash;

  // Bio section
  bioFileData = {
    profilePicture: null,
    thumbnail: null,
    curriculumVitae: null
  }
  bioPreviewUrl = {
    profilePicture: null,
    thumbnail: null,
    curriculumVitae: null
  }
  bioOldSortingHash = {
    profilePicture: null,
    thumbnail: null,
    curriculumVitae: null
  }

  constructor(private backend: BackendService, private settings: SiteSettingsService, private router: Router) {
    // But initially, we'll store a http url to the file of the current images
    this.logoPreviewUrl = ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.siteLogo + '.png';
    this.logoOldSortingHash = this.settings.siteSettings.siteLogo;

    this.previewUrl = [
      ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.landingImageOne + '.jpg',
      ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.landingImageTwo + '.jpg',
      ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.landingImageThree + '.jpg'
    ];
    this.oldSortingHash = [ // Save our current images' names in a variable in case we want to change them later
      this.settings.siteSettings.landingImageOne,
      this.settings.siteSettings.landingImageTwo,
      this.settings.siteSettings.landingImageThree
    ];

    this.bioPreviewUrl = {
      profilePicture: ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.profilePicture + '.jpg',
      thumbnail: ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.profileThumbnail + '.jpg',
      curriculumVitae: ApiEndpoints.CV + '/' + this.settings.siteSettings.curriculumVitae + '.pdf'
    }
    this.bioOldSortingHash.profilePicture = this.settings.siteSettings.profilePicture;
    this.bioOldSortingHash.thumbnail = this.settings.siteSettings.profileThumbnail;
    this.bioOldSortingHash.curriculumVitae = this.settings.siteSettings.curriculumVitae;
  }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

  actionFailed() {
    this.operationFailed = true; // Shows failure alert

    // reset pointers
    this._pointer = null;
    this._logoPointer = null;
    this._bioPointer = null;
  }

  actionSuccess() {
    this.operationSuccessful = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    // Empty the form
    this.form.get('title').setValue('');
    this.form.get('desc').setValue('');
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  resetAlert() {
    // Resets alert dialogs
    this.operationSuccessful = false;
    this.operationFailed = false;
  }

  fileProgress(fileInput: any, landingImageIndex: number) {
    this.fileData[landingImageIndex] = <File>fileInput.target.files[0];
    this.preview(landingImageIndex);
  }

  private preview(landingImageIndex: number) {
    // Show image preview 
    let mimeType = this.fileData[landingImageIndex].type;
    if (mimeType.match(/image\/*/) == null)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData[landingImageIndex]);
    reader.onload = (_event) => {
      this.previewUrl[landingImageIndex] = reader.result;
    }
  }

  uploadLandingImage(landingImageIndex: number) {
    if (!this.previewUrl[landingImageIndex]) { // TODO make this test falsy even when previewUrl[landingImageIndex] has the value of an already uploaded image, to prevent resubmission and thus recompression
      alert('Select an image before uploading!');
      return;
    }
    this._pointer = landingImageIndex;
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.fileData[landingImageIndex]);
    this.backend.uploadLandingImage(this, formData);
    this.settings.saveLandingImage(sortingHash, landingImageIndex, this.oldSortingHash[landingImageIndex]);
  }

  bioFileProgress(fileInput: any, type: string) {
    this.bioFileData[type] = <File>fileInput.target.files[0];
    this.bioPreview(type);
  }

  private bioPreview(type: string) {
    // Show image preview
    let mimeType = this.bioFileData[type].type;
    if (mimeType.match(/image\/*/) == null)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(this.bioFileData[type]);
    reader.onload = (_event) => {
      this.bioPreviewUrl[type] = reader.result;
    }
  }

  uploadProfilePicture(type: string) {
    if (!this.bioPreviewUrl[type]) { // TODO make this test falsy even when bioPreviewUrl[type] has the value of an already uploaded image, to prevent resubmission and thus recompression
      alert('Select an image before uploading!');
      return;
    }
    this._bioPointer = type;
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.bioFileData[type]);
    this.backend.uploadProfile(this, formData, type);
    this.settings.saveProfile(sortingHash, type, this.bioOldSortingHash[type]);
  }

  setCV(fileInput: any, type: string) {
    this.bioFileData[type] = <File>fileInput.target.files[0];
  }

  uploadCV() {
    if (!this.bioFileData["curriculumVitae"]) {
      alert('Select a file before uploading!');
      return;
    }
    this._bioPointer = "curriculumVitae";
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.bioFileData["curriculumVitae"]);
    this.backend.uploadProfile(this, formData, "curriculumVitae");
    this.settings.saveProfile(sortingHash, "curriculumVitae", this.bioOldSortingHash["curriculumVitae"]);
  }

  logoFileProgress(fileInput: any) {
    this.logoFileData = <File>fileInput.target.files[0];
    this.logoPreview();
  }

  private logoPreview() {
    // Show image preview 
    let mimeType = this.logoFileData.type;
    if (mimeType.match(/image\/*/) == null)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(this.logoFileData);
    reader.onload = (_event) => {
      this.logoPreviewUrl = reader.result;
    }
  }

  uploadSiteLogo() {
    if (!this.logoPreviewUrl) { // TODO make this test falsy even when bioPreviewUrl[type] has the value of an already uploaded image, to prevent resubmission and thus recompression
      alert('Select an image before uploading!');
      return;
    }
    this._logoPointer = 1;
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    formData.append(sortingHash, this.logoFileData);
    this.backend.uploadSiteLogo(this, formData);
    this.settings.saveSiteLogo(sortingHash, this.logoOldSortingHash);
  }

  // Does nothing
  saveSettings() {
    console.log('Saving...');
  }

  // Does nothing
  onSubmit() { }

  scrollNow() {
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  ngOnInit(): void {
    setTimeout(() => { // Our settings may not arrive from the database quickly enough, so we'll wait for some time, expecting our settings to be ready by that time
      // This timeout is useful when the user reloads this current page. If the user navigated from another page, say the landing page, the settings would already have been available
      // And so, it is a repetition of the constructor
      this.logoPreviewUrl = ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.siteLogo + '.png';
      this.logoOldSortingHash = this.settings.siteSettings.siteLogo;

      this.previewUrl = [ // Set the images, so they don't show the blank ones
        ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.landingImageOne + '.jpg',
        ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.landingImageTwo + '.jpg',
        ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.landingImageThree + '.jpg'
      ];
      this.bioPreviewUrl = {
        profilePicture: ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.profilePicture + '.jpg',
        thumbnail: ApiEndpoints.UPLOADED_FILES + '/big/' + this.settings.siteSettings.profileThumbnail + '.jpg',
        curriculumVitae: ApiEndpoints.CV + '/' + this.settings.siteSettings.curriculumVitae + '.pdf'
      }

      this.oldSortingHash = [ // Save our current images' names in a variable in case we want to change them later
        this.settings.siteSettings.landingImageOne,
        this.settings.siteSettings.landingImageTwo,
        this.settings.siteSettings.landingImageThree
      ];
      this.bioOldSortingHash.profilePicture = this.settings.siteSettings.profilePicture;
      this.bioOldSortingHash.thumbnail = this.settings.siteSettings.profileThumbnail;
      this.bioOldSortingHash.curriculumVitae = this.settings.siteSettings.curriculumVitae;
    }, 500);
  }

}
