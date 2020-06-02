import { NewsletterComponent } from './newsletter/newsletter.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
/* Import the Angular modules we require */
import { RoleGuardService } from './../services/role-guard.service';
import { RouteAuthGuardService } from './../services/route-auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { BlogLandingComponent } from './blog/blog-landing/blog-landing.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { WorksComponent } from './works/works/works.component';
import { LandingComponent } from './landing/landing.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { UploadDetailsComponent } from './admin/upload-details/upload-details.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { NewWorkComponent } from './works/new-work/new-work.component';
import { ViewWorkComponent } from './works/view-work/view-work.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';

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
  // { path: 'works', redirectTo: 'works/p/1', pathMatch: 'full' },
  { path: 'works/p/:page', component: WorksComponent },
  { path: 'view-work/:workid', component: ViewWorkComponent },
  
  {
    path: 'landing', component: LandingComponent,
    canActivate: [RoleGuardService], // Not using this, it's just for demonstration
    data: { expectedRole: 'admin' }
  },
  { path: 'settings', component: SettingsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'upload-details', component: UploadDetailsComponent},
  {
    path: 'new-work', component: NewWorkComponent,
    canActivate: [RouteAuthGuardService]
  },
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
