import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FillableForm } from 'src/services/fillable-form';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, FillableForm {
  
  disableSubmitButton = false;
  showFailMessage = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userAuth: AuthService, private route: Router, private title: Title) {
    title.setTitle('Login - Chinyere Odinukwe')
    userAuth.loginComponent = this;
  }

  onSubmit() {
    this.userAuth.login(this.loginForm.value);
  }

  actionPending() {
    this.disableSubmitButton = true;  // Shows spinning animation on submit button
  }

  actionFailed() {
    this.disableSubmitButton = false;
    this.showFailMessage = true;
  }

  actionSuccess() {
    this.route.navigateByUrl("/blog");
  }

  resetAlert() {
    this.showFailMessage = false;
  }

  ngOnInit(): void {
  }

}
