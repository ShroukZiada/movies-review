import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MoviesService } from 'src/services/movies.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  pageNumberMovie!: number;
  pageNumberTv!: number;
  pageNumberPeople!: number;
  constructor(public _MoviesService: MoviesService, public _Router: Router, private _AuthService: AuthService) { }
  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if (this._AuthService.userData.getValue()!= null) {
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    })

    this._MoviesService.shardPageNumberMovie.subscribe({
      next: () => {
        this.pageNumberMovie = this._MoviesService.shardPageNumberMovie.getValue();
      },
    });
    this._MoviesService.shardPageNumberTv.subscribe({
      next: () => {
        this.pageNumberTv = this._MoviesService.shardPageNumberTv.getValue();
      },
    });
    this._MoviesService.shardPageNumberPeople.subscribe({
      next: () => {
        this.pageNumberPeople = this._MoviesService.shardPageNumberPeople.getValue();
      },
    });

  }

  logOut(){
      this._AuthService.logOut();
  }
}
