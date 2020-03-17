import { BackendService } from './../../../services/backend.service';
import { FillableForm } from 'src/services/fillable-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.css']
})
export class NewWorkComponent implements OnInit, FillableForm {

  // TODO secure routes that require authentication

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  });

  fileData: File = null;
  previewUrl: any = null;
  // uploadedFilePath: string = null;

  constructor(private backend: BackendService, private router: Router) { }

  actionPending() {
    console.log("action pending");
  }

  actionFailed() {
    throw new Error("Method not implemented.");
  }

  actionSuccess() {
    // this.uploadedFilePath = res.data.filePath;
    console.log("image uploaded");
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
    formData.append('file', this.fileData);
    this.backend.uploadImage(this, formData);
  }

  ngOnInit(): void {
  }

}
