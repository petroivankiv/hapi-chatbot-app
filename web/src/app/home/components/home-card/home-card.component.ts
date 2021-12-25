import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() card: { title?: string; product?: string; icon?: string } = {}

  onNavigate(product?: string) {
    this.router.navigate(['/shop', { product }]).then();
  }

}
