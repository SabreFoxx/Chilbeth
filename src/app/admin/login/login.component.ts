import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthFillableForm } from 'src/services/auth-fillable-form';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AuthFillableForm {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userAuth: AuthService, private route: Router) {
    userAuth.loginComponent = this;
  }

  onSubmit() {
    console.log(this.loginForm.value); // TODO
    this.userAuth.login(this.loginForm.value);
  }

  authPending() {
    // play waiting animation
    console.log("auth is pending");
  }

  authFailed() {

  }

  authSuccess() {
    this.route.navigateByUrl("/blog");
  }

  ngOnInit(): void {
  }

}
