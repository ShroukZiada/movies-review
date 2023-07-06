import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './signup/signup.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { PeopleComponent } from './people/people.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { AuthGuard } from './guard/auth.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
{path:'', redirectTo:'home', pathMatch:'full'},
{path:'home' ,component:HomeComponent,title:'Home'},
{path:'about' ,component:AboutComponent,title:'About'},
{path:'movies/:num', component:MoviesComponent,title:'Movies'},
{path:'tv/:num', component:TvShowComponent,title:'TvShow'},
{path:'person/:num', component:PeopleComponent,title:'People'},
{path:'moviedetails/:id/:type', component:MoviedetailsComponent,title:'MovieDetails'},
{path:'login', component:LoginComponent,title:'Login'},
{path:'signup', component:SignupComponent,title:'Signup'},
{path:'search', component:SearchComponent,title:'SearchMovies'},
{path:'**', component:NotfoundComponent,title:'NotfoundComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
