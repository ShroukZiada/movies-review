import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  moviesSubscrip: any;
  unsubscribe: any;
  imagePath: string = this._MoviesService.imagePath;
  trendingPeople: any[] = [];
  pageNumArray!: number[]; //create paginagtion Number By array
  totalPages!: number;  //response.total_page
  activatePageNum!: number;
  curentPaginationClick: number = 1;
  constructor(private _MoviesService: MoviesService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
  }
  ngOnDestroy(): void {
    this.unsubscribe = this.moviesSubscrip.unsubscribe();

  }
  ngOnInit(): void {
    this.getPeople(this.activatePageNum);
  }

  getPeople(num: number): void {
    this.moviesSubscrip = this._MoviesService
      .getPeople('person', num)
      .subscribe({
        next: (res) => {
          this.trendingPeople = res.results;
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
          this._Router.navigate(['/person/1']).finally(()=>{
            this.getPeople(this.activatePageNum);
          });
        }
      });
  }

  changePageUrl(e: any): void {
    this.curentPaginationClick = parseInt(e); // Get Number When Click in pagination inner Httml
    // to unsubscript
    this.getPeople(this.curentPaginationClick);
  }
//  to prev page
  pervPage(): void {
    if(this.activatePageNum > 1){
     let currentActive:number = this.activatePageNum;
     this._Router.navigate([`/person/${(currentActive -= 1)}`])
     .finally(()=>{
      this.getPeople(currentActive);
     });
}

  }
  // to next page
  nextPage(): void {
    if (this.totalPages > this.activatePageNum) {
          let curentActivate: number = this.activatePageNum;
          this._Router
            .navigate([`/person/${(curentActivate += 1)}`])
            .finally(() => {
              this.getPeople(curentActivate);
            });
        }
      }

}
