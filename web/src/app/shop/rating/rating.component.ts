import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating?: number;

  get rate(): number {
    return this.rating || 0;
  }

  get rateIcons(): string[] {
    return Array(5).fill('').map((e,i)=> 'star_rate');
  }

  constructor() { }

  ngOnInit(): void {
  }

  isActive(index: number) {
    return index + 1 <= this.rate;
  }
}
