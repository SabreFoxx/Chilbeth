import { RoleGuardService } from './../services/role-guard.service';
import { RouteAuthGuardService } from './../services/route-auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsletterComponent } from './newsletter/newsletter.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutComponent } from './about/about.component';
import { BlogLandingComponent } from './blog/blog-landing/blog-landing.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { WorksComponent } from './works/works/works.component';
import { EditCategoriesComponent } from './works/edit-categories/edit-categories.component';
import { LandingComponent } from './landing/landing.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { UploadDetailsComponent } from './admin/upload-details/upload-details.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { NewWorkComponent } from './works/new-work/new-work.component';
import { ViewWorkComponent } from './works/view-work/view-work.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { EditWorkComponent } from './works/edit-work/edit-work.component';
import { EditExhibitionComponent } from './works/edit-exhibition/edit-exhibition.component';
import { NewExhibitionComponent } from './works/new-exhibition/new-exhibition.component';
import { ViewExhibitionComponent } from './works/view-exhibition/view-exhibition.component';
import { ExhibitionsComponent as ExhibitionComponent } from './works/exhibition/exhibition.component';

/* Configure routes */
const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogLandingComponent },
  { 
    path: 'edit-blog/:blogid', component: EditBlogComponent,
    canActivate: [RouteAuthGuardService]
  },
  { path: 'blog/p/:page', component: BlogLandingComponent },
  {
    path: 'new-blog', component: NewBlogComponent,
    canActivate: [RouteAuthGuardService]
  },
  { path: 'view-blog/:blogid', component: ViewBlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'works', component: WorksComponent},
  { path: 'works/:category', component: WorksComponent},
  { path: 'works/:category/p/:page', component: WorksComponent},
  { path: 'works/p/:page', component: WorksComponent },
  { path: 'view-work/:workid', component: ViewWorkComponent },
  {
    path: 'new-work', component: NewWorkComponent,
    canActivate: [RouteAuthGuardService]
  },
  {
    path: 'edit-work/:workid', component: EditWorkComponent,
    canActivate: [RouteAuthGuardService]
  },
  {
    path: 'edit-categories', component: EditCategoriesComponent,
    canActivate: [RouteAuthGuardService]
  },
  { path: 'exhibitions', component: ExhibitionComponent},
  { path: 'exhibitions/p/:page', component: ExhibitionComponent},
  { path: 'view-exhibition/:exhibitionid', component: ViewExhibitionComponent },
  {
    path: 'new-exhibition', component: NewExhibitionComponent,
    canActivate: [RouteAuthGuardService]
  },
  {
    path: 'edit-exhibition/:exhibitionid', component: EditExhibitionComponent,
    canActivate: [RouteAuthGuardService]
  },

  {
    path: 'landing', component: LandingComponent,
    canActivate: [RoleGuardService], // Not using this, it's just for demonstration
    data: { expectedRole: 'admin' }
  },
  { path: 'settings', component: SettingsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'upload-details', component: UploadDetailsComponent},
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'home', component: LandingComponent },
  { path: '', component: LandingComponent }, // The LandingComponent is the default component
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
