import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService  {
  constructor(private _HttpClient:HttpClient ) { }
  shardPageNumberMovie: BehaviorSubject<any> = new BehaviorSubject(1);
  shardPageNumberTv: BehaviorSubject<any> = new BehaviorSubject(1);
  shardPageNumberPeople: BehaviorSubject<any> = new BehaviorSubject(1);
  ouerLatestMovies: BehaviorSubject<any> = new BehaviorSubject(null);
  imagePath: string = 'https://image.tmdb.org/t/p/w500';

  getTrendingMovie(mediaType:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=866cd3a065ef9304a549f1d65e494940`)
  }
  getDetailsId(id: string | null, type: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US`
    );
  }
  getMovieByPagination(type:string , pageNum:number):Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/${type}/popular?api_key=48d62e7452a1f1a5e6018217ac27c50a&page=${pageNum}`
    );
  }
  getPeople(type:string , pageNum:number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/person/popular?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&page=${pageNum}`
    );
  }
  getSearch(keyword:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&query=${keyword}&page=1&include_adult=false`)
  }
}
