import { SiteSettingsService } from './../../../services/site-settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FillableForm } from 'src/services/fillable-form';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, FillableForm {

  /* Alert flags */
  successSavingSettings = false;
  failedSavingSettings = false;
  disableSubmitButton = false;

  form = new FormGroup({
    name: new FormControl(this.settings.siteSettings.name),
    occupation: new FormControl(this.settings.siteSettings.occupation),
    desc: new FormControl(this.settings.siteSettings.desc),
    landing_message_heading: new FormControl(this.settings.siteSettings.landing_message_heading),
    landing_message: new FormControl(this.settings.siteSettings.landing_message),
    about_heading: new FormControl(this.settings.siteSettings.about_heading),
    about: new FormControl(this.settings.siteSettings.about),
    phone: new FormControl(this.settings.siteSettings.phone),
    email: new FormControl(this.settings.siteSettings.email),
    facebook: new FormControl(this.settings.siteSettings.facebook),
    twitter: new FormControl(this.settings.siteSettings.twitter),
    youtube: new FormControl(this.settings.siteSettings.youtube),
    instagram: new FormControl(this.settings.siteSettings.instagram),
    city: new FormControl(this.settings.siteSettings.city),
    district: new FormControl(this.settings.siteSettings.district),
    country: new FormControl(this.settings.siteSettings.country),
    opening_times: new FormControl(this.settings.siteSettings.opening_times)
  });

  constructor(private settings: SiteSettingsService, private router: Router) { }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

  actionFailed() {
    this.failedSavingSettings = true; // Shows failure alert
  }

  actionSuccess() {
    this.successSavingSettings = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button

    ScrollToTopComponent.scrollToTop(); // Scrolls page to the top
  }

  resetAlert() {
    // Reset alert dialogs
    this.successSavingSettings = false;
    this.failedSavingSettings = false;
  }

  gotoUploadDetails() {
    this.router.navigateByUrl('/upload-details');
  }

  gotoChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  gotoNewsLetters() {
    this.router.navigateByUrl('/newsletter');
  }

  onSubmit() {
    this.settings.saveSiteSettings(this, this.form.value);
  }

  ngOnInit(): void {
    setTimeout(() => { // Update the values in case this page is refreshed, so as to remove any blank values
      this.form.get('name').setValue(this.settings.siteSettings.name);
      this.form.get('occupation').setValue(this.settings.siteSettings.occupation);
      this.form.get('desc').setValue(this.settings.siteSettings.desc);
      this.form.get('landing_message_heading').setValue(this.settings.siteSettings.landing_message_heading);
      this.form.get('landing_message').setValue(this.settings.siteSettings.landing_message);
      this.form.get('about_heading').setValue(this.settings.siteSettings.about_heading);
      this.form.get('about').setValue(this.settings.siteSettings.about);
      this.form.get('phone').setValue(this.settings.siteSettings.phone);
      this.form.get('email').setValue(this.settings.siteSettings.email);
      this.form.get('facebook').setValue(this.settings.siteSettings.facebook);
      this.form.get('twitter').setValue(this.settings.siteSettings.twitter);
      this.form.get('youtube').setValue(this.settings.siteSettings.youtube);
      this.form.get('instagram').setValue(this.settings.siteSettings.instagram);
      this.form.get('city').setValue(this.settings.siteSettings.city);
      this.form.get('district').setValue(this.settings.siteSettings.district);
      this.form.get('country').setValue(this.settings.siteSettings.country);
      this.form.get('opening_times').setValue(this.settings.siteSettings.opening_times);
    }, 500);
  }

}
