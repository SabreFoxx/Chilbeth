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
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { NewWorkComponent } from './works/new-work/new-work.component';
import { ViewWorkComponent } from './works/view-work/view-work.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* Configure routes */
const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogLandingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'works', component: WorksComponent },
  {
    path: 'landing', component: LandingComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'admin' }
  },
  { path: 'settings', component: SettingsComponent },
  { path: 'new-blog', component: NewBlogComponent },
  { path: 'view-blog', component: ViewBlogComponent },
  {
    path: 'new-work', component: NewWorkComponent,
    canActivate: [RouteAuthGuardService]
  },
  { path: 'view-work', component: ViewWorkComponent },
  { path: 'home', component: LandingComponent },
  { path: '', component: LandingComponent }, // The LandingComponent is the default component
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
