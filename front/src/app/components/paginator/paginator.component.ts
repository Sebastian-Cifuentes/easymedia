import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator } from 'src/app/interfaces/Paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() totalPosts!: number;
  @Output() onchangepage: EventEmitter<Paginator> = new EventEmitter<Paginator>()
  pages: number[] = [];
  beforePage = 0;
  nextPage = 1;
  limit = 2;

  ngOnInit(): void {
      for (let i = 0; i < this.totalPosts/this.limit; i++) {
        this.pages.push(i);
      }
  }

  changePage(page: number) {
    this.onchangepage.emit({limit: this.limit, offset: page+page});
    this.beforePage = page % 2 === 0 ? page : page - 1;
    this.nextPage = page % 2 === 1 ? page + 2 : page + 1;
  }

  changeBeforePage(page: number) {
    if (page < 0) return;
    this.onchangepage.emit({limit: this.limit, offset: page});
    this.beforePage = page-this.limit;
    this.nextPage = page+1;
  }

  changeNextPage(page: number) {
    this.onchangepage.emit({limit: this.limit, offset: this.nextPage+1});
    this.beforePage = page-1;
    this.nextPage = page+this.limit;
  }

}
