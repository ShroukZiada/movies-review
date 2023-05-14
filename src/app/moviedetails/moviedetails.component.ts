import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService: MoviesService) { }
  curentId!: string | null;
  curentType!: string | null;
  movieDetails:any= {};
  imgSrc!: string;
  imagePath: string = 'https://image.tmdb.org/t/p/w500';


  ngOnInit(): void {
    this.curentId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.curentType = this._ActivatedRoute.snapshot.paramMap.get('type');
    this.imgSrc = this.imagePath;
    this.getDetails();
  }
  getDetails(): void {
    this._MoviesService
      .getDetailsId(this.curentId, this.curentType).subscribe((response)=>{
        this.movieDetails = response;
        console.log(response);
      })

  }

}




