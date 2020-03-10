/* Import the Angular modules we need */
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

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

/* Configure routes */
const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogLandingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'works', component: WorksComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'new-blog', component: NewBlogComponent },
  { path: 'new-work', component: NewWorkComponent },
  { path: '', component: LandingComponent }, // The LandingComponent is the default component
  { path: '**', component: LandingComponent }
];

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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
