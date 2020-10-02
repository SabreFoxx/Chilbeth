/* Import the Angular modules we need */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

/* Import all the pipes that make up our app */
import { EscapeHtmlPipe } from "./others/keep-html.pipe";

/* Import all the components that make up our app */
import { AppComponent } from './app.component';
import { WorksComponent } from './works/works/works.component';
import { LoginComponent } from './admin/login/login.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { BlogLandingComponent } from './blog/blog-landing/blog-landing.component';
import { ContactComponent } from './contact/contact.component';
import { ViewWorkComponent } from './works/view-work/view-work.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { NewWorkComponent } from './works/new-work/new-work.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { SideBarComponent } from './blog/side-bar/side-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScrollToTopComponent } from './others/scroll-to-top/scroll-to-top.component';
import { PaginationComponent } from './pagination/pagination.component';
import { WorkSpecialPaginationComponent } from './pagination/work-special-pagination/work-special-pagination.component';
import { RecentComponent } from './blog/recent/recent.component';
import { UploadDetailsComponent } from './admin/upload-details/upload-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SearchComponent } from './blog/search/search.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { EditCategoriesComponent } from './works/edit-categories/edit-categories.component';
import { EditWorkComponent } from './works/edit-work/edit-work.component';
import { ExhibitionsComponent } from './works/exhibitions/exhibitions.component';
import { ViewExhibitionComponent } from './works/view-exhibition/view-exhibition.component';
import { NewExhibitionComponent } from './works/new-exhibition/new-exhibition.component';
import { EditExhibitionComponent } from './works/edit-exhibition/edit-exhibition.component';
import { YoutubeComponent } from './youtube/youtube.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    BlogLandingComponent,
    ContactComponent,
    LoginComponent,
    WorksComponent,
    ViewWorkComponent,
    NewBlogComponent,
    NewWorkComponent,
    SettingsComponent,
    ViewBlogComponent,
    SideBarComponent,
    NotFoundComponent,
    ScrollToTopComponent,
    EscapeHtmlPipe,
    PaginationComponent,
    WorkSpecialPaginationComponent,
    RecentComponent,
    UploadDetailsComponent,
    ChangePasswordComponent,
    NewsletterComponent,
    SearchComponent,
    EditBlogComponent,
    EditCategoriesComponent,
    EditWorkComponent,
    ExhibitionsComponent,
    ViewExhibitionComponent,
    NewExhibitionComponent,
    EditExhibitionComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
