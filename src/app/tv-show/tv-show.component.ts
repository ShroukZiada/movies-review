import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit,OnDestroy {
  constructor(private _MoviesService: MoviesService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
  }
  trendingTv: any[] = [];
  moviesSubscrip: any;
  unsubscribe: any;
  imagePath: string = this._MoviesService.imagePath;
  pageNumArray!: number[]; //create paginagtion Number By array
  totalPages!: number;  //response.total_page
  activatePageNum: number = 1;
  curentPaginationClick: number = 1;

  ngOnInit(): void {
    this.getMovies(this.activatePageNum);
  }
  ngOnDestroy(): void {
    this.unsubscribe = this.moviesSubscrip.unsubscribe();
  }

  getMovies(num: number): void {
    this.moviesSubscrip = this._MoviesService
      .getMovieByPagination('tv', num)
      .subscribe({
        next: (res) => {
          this.trendingTv = res.results;
          this.totalPages = res.total_pages;
          this.activatePageNum = res.page;
          console.log(res);
          console.log(this.totalPages);
          console.log(this. activatePageNum);
          if (this.totalPages >= 11 && this.totalPages >= this.activatePageNum) {
            console.log('true', this.totalPages);
            if (this.activatePageNum >= this.totalPages) {
              console.log('Hello')
              this.pageNumArray = new Array(6)
                .fill(this.activatePageNum >= 5 ? this.activatePageNum - 5: (this.activatePageNum = 5))
                .map((x, y) => {
                  if (x + y > this.totalPages) {
                    return x - y;
                  } else {
                    return x + y;
                  }
                });
            } else {
              this.pageNumArray = new Array(8)
                .fill(this.activatePageNum >= 1 ? this.activatePageNum - 0 : (this.activatePageNum = 3))
                .map((x, y) => {
                  return x + y;
                });
            }
          }
          else if (this.totalPages < 11 && this.totalPages > this.activatePageNum) {
            this.pageNumArray = new Array(this.totalPages)
              .fill(this.activatePageNum >= 2 ? this.activatePageNum - 2 : this.activatePageNum)
              .map((x , y )=> x + y);
          }
        },
        complete:()=>{
          this._MoviesService.shardPageNumberTv.next(this.activatePageNum);
        },
        error:(err)=>{
          alert(`Page Not Found : ${err.error.errors[0]}`);
          this._Router.navigate(['/tv/1']).finally(()=>{
            this.getMovies(this.activatePageNum);
          });
        }
      });
  }

  changePageUrl(e: any): void {
    this.curentPaginationClick = parseInt(e); // Get Number When Click in pagination inner Httml
    // to unsubscript
    this.getMovies(this.curentPaginationClick);
  }
//  to prev page
  pervPage(): void {
    if(this.activatePageNum > 1){
     let currentActive:number = this.activatePageNum;
     this._Router.navigate([`/tv/${(currentActive -= 1)}`])
     .finally(()=>{
      this.getMovies(currentActive);
     });
}

  }
  // to next page
  nextPage(): void {
    if (this.totalPages > this.activatePageNum) {
          let curentActivate: number = this.activatePageNum;
          this._Router
            .navigate([`/tv/${(curentActivate += 1)}`])
            .finally(() => {
              this.getMovies(curentActivate);
            });
        }
      }


}
