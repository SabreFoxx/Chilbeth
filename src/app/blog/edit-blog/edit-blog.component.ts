import { NewBlogComponent } from '../new-blog/new-blog.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { emptyStub } from 'src/services/fillable-form';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-edit',
  templateUrl: '../new-blog/new-blog.component.html',
  styleUrls: ['../new-blog/new-blog.component.css']
})
export class EditBlogComponent extends NewBlogComponent implements OnInit {

  blogId: string;
  oldImageSortingHash: string;

  constructor(private route: ActivatedRoute, protected backend: BackendService,
    protected router: Router, protected title: Title) {
    super(backend, router, title)
    title.setTitle('Edit Blog - Chinyere Odinukwe')
  }

  actionSuccess() {
    this.successCreatingBlog = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  ngOnInit(): void {
    this.fileData = null; // We need this null bcos we'll use it to chech if we changed pic

    this.route.paramMap
      .subscribe(params => {
        this.blogId = params.get("blogid"); // Save blogId to variable
        this.backend.fetchBlog(this.blogId)
          .subscribe(res => {
            this.oldImageSortingHash = res.imageSortHash;
            this.form.get("title").setValue(res.title);
            this.form.get("desc").setValue(res.desc);
            this.form.get("videoUrl").setValue(res.videoUrl);
            this.previewUrl = this.backend.uploadsUrlPrefix + "/big/" + res.imageSortHash + ".jpg";
            this.bigFormContent = res.post;
          });
      });
  }

  onSubmit() {
    let formText = this.form.value;
    formText.sortingHash = this.oldImageSortingHash;
    formText.post = this.bigFormContent;

    let callbackNotifier = this;

    if (this.fileData) { // If I changed the picture
      // sortingHash will be used to identify the image in the database. It's also used here as the name of the binary we're sending
      let newSortingHash = this.backend.generateUniqueChronoString();

      formText.sortingHash = newSortingHash;
      const formData = new FormData();
      // # acts as separator, so I can split names
      // I need the oldImageSortingHash as well, so I can delete it
      formData.append(newSortingHash + '#' + this.oldImageSortingHash, this.fileData);
      this.backend.uploadImageAndDeleteOld(callbackNotifier, formData);
      callbackNotifier = <any>emptyStub;
    }

    this.backend.updateBlog(callbackNotifier, formText, this.blogId);
  }

  saveBlogText = "Edit Blog";
  saveBlogProgressText = "Saving...";
  successMsg = "Blog edited successfully! ";
  failureMsg = "A problem occured while editing your blog!";
}
