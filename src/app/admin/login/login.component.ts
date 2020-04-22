import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FillableForm } from 'src/services/fillable-form';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, FillableForm {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userAuth: AuthService, private route: Router) {
    userAuth.loginComponent = this;
  }

  onSubmit() {
    this.userAuth.login(this.loginForm.value);
  }

  actionPending() {
    // play waiting animation
    console.log("auth is pending"); // TODO
  }

  actionFailed() {

  }

  actionSuccess() {
    this.route.navigateByUrl("/blog");
  }

  ngOnInit(): void {
  }

}
