import { NewBlogComponent } from '../new-blog/new-blog.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { emptyStub } from 'src/services/fillable-form';

@Component({
  selector: 'app-blog-edit',
  templateUrl: '../new-blog/new-blog.component.html',
  styleUrls: ['../new-blog/new-blog.component.css']
})
export class EditBlogComponent extends NewBlogComponent implements OnInit {

  blogId: string;
  oldImageSortingHash: string;

  constructor(private route: ActivatedRoute, protected backend: BackendService, protected router: Router) {
    super(backend, router);
  }

  actionSuccess() {
    this.successCreatingBlog = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.blogId = params.get("blogid"); // Save blogId to variable
        this.backend.fetchBlog(this.blogId)
          .subscribe(res => {
            this.oldImageSortingHash = res.imageSortHash;
            this.form.get("title").setValue(res.title);
            this.form.get("desc").setValue(res.desc);
            this.previewUrl = this.backend.uploadsUrlPrefix + "/big/" + res.imageSortHash + ".jpg";
            this.bigFormContent = res.post;
          });
      });
  }

  onSubmit() {
    const formData = new FormData();
    // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
    let sortingHash = this.backend.generateUniqueChronoString();
    // # acts as separator, so I can split names
    // I need the oldImageSortingHash as well, so I can delete it
    formData.append(sortingHash + '#' + this.oldImageSortingHash, this.fileData);
    this.backend.uploadImageAndDeleteOld(this, formData);

    let formText = this.form.value;
    formText.sortingHash = sortingHash;
    formText.post = this.bigFormContent;
    this.backend.updateBlog(emptyStub, formText, this.blogId);
  }

  saveBlogText = "Edit Blog";
  saveBlogProgressText = "Saving...";
  successMsg = "Blog edited successfully! ";
  failureMsg = "A problem occured while editing your blog!";
}
