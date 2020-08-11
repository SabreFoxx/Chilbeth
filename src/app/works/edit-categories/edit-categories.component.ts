import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {

  categories;
  disableSubmitButton = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(protected backend: BackendService) {
  }

  onSubmit() {
    this.backend.addWorkCategory(this, this.form.value);
  }

  actionPending() {
    this.disableSubmitButton = true;
  }

  actionFailed() {
    this.disableSubmitButton = false;
  }

  actionSuccess() {
    this.disableSubmitButton = false;
    this.form.get("title").setValue("");
    this.fetchCategories();
  }

  fetchCategories() {
    this.backend.fetchWorkCategories()
      .subscribe(res => this.categories = res);
  }

  deleteCategory(i: number) {
    this.backend.deleteWorkCategory(this.categories[i]._id)
      .subscribe(res => this.fetchCategories());
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

}
