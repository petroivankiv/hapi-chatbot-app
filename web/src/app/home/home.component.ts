import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards = [
    { title: 'Learn Angular',  href: 'https://angular.io/tutorial', icon: 'learn' },
    { title: 'CLI Documentation',  href: 'https://angular.io/cli', icon: 'cli' },
    { title: 'Angular Material',  href: 'https://material.angular.io', icon: 'material' },
    { title: 'Angular Blog',  href: 'https://blog.angular.io/', icon: 'blog' },
    { title: 'Angular DevTools',  href: 'https://angular.io/devtools/', icon: 'devtools' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
