import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: ['./filter-summary.component.scss']
})
export class FilterSummaryComponent implements OnInit {

  @Input() summary?: Record<string, string>;
  @Output() remove = new EventEmitter<{ key: string; value: string }>();

  constructor() { }

  ngOnInit(): void {
  }

}
