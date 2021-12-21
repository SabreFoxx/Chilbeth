import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FillableForm } from 'src/services/fillable-form';
import { ScrollToTopComponent } from '../others/scroll-to-top/scroll-to-top.component';
import { AuthService } from 'src/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, FillableForm {

  /* Alert flags */
  disableSubmitButton = false;
  showFailMessage = false;
  showSuccessMessage = false;

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    retypePassword: new FormControl("", Validators.required),
  });

  constructor(private userAuth: AuthService, private title: Title) {
    title.setTitle('Change Password - Chinyere Odinukwe')
  }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

  actionSuccess() {
    this.resetAlert();
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    this.showSuccessMessage = true;
    ScrollToTopComponent.scrollToTop(); // Scrolls page to the top
  }

  actionFailed() {
    this.resetAlert();
    this.disableSubmitButton = false;
    this.showFailMessage = true;
    ScrollToTopComponent.scrollToTop();
  }

  resetAlert() {
    // Reset alert dialogs
    this.showFailMessage = false;
    this.showSuccessMessage = false;
  }

  onSubmit() {
    this.userAuth.changePassword(this, this.changePasswordForm.value);
  }

  ngOnInit(): void {
  }

}
