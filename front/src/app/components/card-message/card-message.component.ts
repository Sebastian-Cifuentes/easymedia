import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';

@Component({
  selector: 'app-card-message',
  templateUrl: './card-message.component.html',
  styleUrls: ['./card-message.component.scss']
})
export class CardMessageComponent {

  @Input() post!: Post;

}
