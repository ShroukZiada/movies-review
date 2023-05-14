import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/services/movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(public _MoviesService: MoviesService) { }
  trendingMovies: any[] = [];
  trendingTv: any[] = [];
  trendingPeople: any[] = [];
  imagePath: string = this._MoviesService.imagePath;
  ngOnInit(): void {
    this._MoviesService.getTrendingMovie('movie').subscribe((response) => {
      this.trendingMovies = response.results.slice(0, 10);
      console.log(response)

    })
    this._MoviesService.getTrendingMovie('tv').subscribe((response) => {
      this.trendingTv = response.results.slice(0, 10);

    })
    this._MoviesService.getTrendingMovie('person').subscribe((response) => {
      this.trendingPeople = response.results.slice(0, 10);

    })


  }
}
