/* Import the Angular modules we need */
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/* Import all the components that make up our app */
import { AppComponent } from './app.component';
import { ArtworksComponent } from './artworks/artworks/artworks.component';
import { LoginComponent } from './admin/login/login.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { BlogLandingComponent } from './blog/blog-landing/blog-landing.component';
import { ContactComponent } from './contact/contact.component';
import { ViewArtComponent } from './artworks/view-art/view-art.component';

/* Configure routes */
const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogLandingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'artworks', component: ArtworksComponent },
  { path: 'landing', component: LandingComponent },
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
    ArtworksComponent,
    ViewArtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
