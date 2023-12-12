import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by-word',
  templateUrl: './filter-by-word.component.html',
  styleUrls: ['./filter-by-word.component.scss']
})
export class FilterByWordComponent {

  @Output() onsearch: EventEmitter<string> = new EventEmitter<string>();

  search(target: any) {
    this.onsearch.emit(target.value);
  }

}
