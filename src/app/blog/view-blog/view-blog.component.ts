import { DomSanitizer } from '@angular/platform-browser';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { FillableForm } from 'src/services/fillable-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToTopComponent } from 'src/app/others/scroll-to-top/scroll-to-top.component';
import { RoleGuardService } from 'src/services/role-guard.service';
import { SiteSettingsService } from 'src/services/site-settings.service';
import { getYoutubeVideoId } from 'src/app/others/functions';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit, FillableForm {
  blogId: string;
  blog: any = '';
  youtubeUrl: any = null;

  blogComments;
  commentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    comment: new FormControl('')
  });

  /* Comment add alert flags */
  successCreatingBlog = false;
  failedCreatingBlog = false;
  disableSubmitButton = false;

  constructor(public settings: SiteSettingsService, private route: ActivatedRoute,
    private roleGuard: RoleGuardService, private sanitizer: DomSanitizer,
    private router: Router, public backend: BackendService) { }

  /* Comment add alert methods */
  actionPending() {
    this.disableSubmitButton = true; // Shows spinning animation on submit button
  }

  actionFailed() {
    this.failedCreatingBlog = true; // Shows failure alert
  }

  actionSuccess() {
    this.ngOnInit();
    this.successCreatingBlog = true; // Shows success alert
    this.disableSubmitButton = false; // Disables spinning animation on submit button
    // Empties the form
    this.commentForm.get('name').setValue('');
    this.commentForm.get('email').setValue('');
    this.commentForm.get('comment').setValue('');
    ScrollToTopComponent.scrollToTop(); // Scrolls page to top
  }

  resetAlert() {
    // Resets alert dialogs
    this.successCreatingBlog = false;
    this.failedCreatingBlog = false;
  }
  /* End alert methods */

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.blogId = params.get("blogid"); // Save blogId to variable
        this.backend.fetchBlog(this.blogId)
          .subscribe(res => {
            this.blog = res;
            if (this.blog.videoUrl.length > 1) {
              this.youtubeUrl = `https://youtube.com/embed/${getYoutubeVideoId(this.blog.videoUrl)}`
              this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl);
            }
          });
        // Load comments
        this.backend.fetchBlogComments(this.blogId)
          .subscribe(res => this.blogComments = res);
      });
  }

  addComment(): void {
    this.backend.addBlogComment(this, this.commentForm.value, this.blogId);
  }

  canEdit(): boolean {
    return this.roleGuard.canUse('admin');
  }

  deleteBlog(): void {
    let c = confirm("Are you sure you want to delete the blog?");
    if (c) {
      this.backend.performSimpleDelete(ApiEndpoints.BLOG + `/${this.blogId}`)
        .subscribe(res => this.router.navigateByUrl('/blog'));
      // TODO if delete was successful, a 204 status will be received. Use this
    }
  }

  deleteComment(id: number): void {
    let c = confirm("Are you sure you want to delete the comment?");
    if (c) {
      let commentId = this.blogComments[id]._id;
      this.backend.performSimpleDelete(ApiEndpoints.BLOG + `/${this.blogId}` + "/comment" + `/${commentId}`)
        .subscribe(res => this.ngOnInit());
      // TODO if delete was successful, a 204 status will be received. Use this
    }
  }

  editBlog(): void {
    this.router.navigateByUrl('/edit-blog/' + this.blogId);
  }

  public get thumbnailPicture() {
    let prefix = ApiEndpoints.UPLOADED_FILES + '/big/';
    let postfix = '.jpg';
    return prefix + this.settings.siteSettings.profileThumbnail + postfix;
  }

  get name() {
    return this.settings.siteSettings.name;
  }

  get desc() {
    return this.settings.siteSettings.desc;
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

}
