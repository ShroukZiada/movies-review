import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { MoviesComponent } from './movies/movies.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { PeopleComponent } from './people/people.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OverViewPipe } from '../pipe/over-view.pipe';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NotfoundComponent,
    NavbarComponent,
    SignupComponent,
    MoviesComponent,
    TvShowComponent,
    PeopleComponent,
    MoviedetailsComponent,
    HeaderComponent,
    OverViewPipe,
    SearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
