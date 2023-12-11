import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMessageComponent } from './card-message/card-message.component';
import { FilterDateComponent } from './filter-date/filter-date.component';
import { FilterByWordComponent } from './filter-by-word/filter-by-word.component';
import { ShowPostsComponent } from './show-posts/show-posts.component';
import { MaterialModule } from '../material/material.module';
import { NothingToSeeComponent } from './nothing-to-see/nothing-to-see.component';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    CardMessageComponent,
    FilterDateComponent,
    FilterByWordComponent,
    ShowPostsComponent,
    NothingToSeeComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CardMessageComponent,
    FilterDateComponent,
    FilterByWordComponent,
    ShowPostsComponent,
    NothingToSeeComponent,
    PaginatorComponent
  ]
})
export class ComponentsModule { }
