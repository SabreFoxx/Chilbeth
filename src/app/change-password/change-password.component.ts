import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new FormGroup({
    old: new FormControl("", Validators.required),
    new: new FormControl("", Validators.required),
    retype: new FormControl("", Validators.required),
  });

  constructor() { }

  onSubmit() {}

  ngOnInit(): void {
  }

}
