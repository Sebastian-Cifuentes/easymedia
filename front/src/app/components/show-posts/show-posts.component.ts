import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.scss']
})
export class ShowPostsComponent {

  @Input() totalPosts!: number;
  @Input() totalPage!: number;

}
