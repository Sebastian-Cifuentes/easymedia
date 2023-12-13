import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent {

  @Output() ondate: EventEmitter<string> = new EventEmitter<string>();

  date(target: any) {
    this.ondate.emit(target.value);
  }

}
