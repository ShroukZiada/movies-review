import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  imagePath: string = this._MoviesService.imagePath;
  trendingMovies: any[] = [];

  constructor(private _MoviesService:MoviesService){}
  ngOnInit(): void {
  }
  getSearch (keyword: string) {
    if(keyword.length > 0){
      this._MoviesService.getSearch(keyword).subscribe({
        next: (response) =>{
          console.log(response.results)
          this.trendingMovies = response.results;
        }
      })

    }

  }

}
