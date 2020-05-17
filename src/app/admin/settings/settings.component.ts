import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required)
  });
  
  constructor(private router: Router) { }

  gotoUploadDetails() {
    this.router.navigateByUrl('/upload-details');
  }

  onSubmit() { }

  ngOnInit(): void {
  }

}
