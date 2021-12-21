import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  constructor(protected backend: BackendService, private title: Title) {
    title.setTitle('Edit Category - Chinyere Odinukwe')
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
    if (this.categories[i].numberOfWorks > 0)
      alert(`The ${this.categories[i].title} category is not empty, and cannot be deleted!`);
    else
      this.backend.deleteWorkCategory(this.categories[i]._id)
        .subscribe(res => this.fetchCategories());
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

}
