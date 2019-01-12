import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'acme-widgets-home',
  template: `
    <h1>ACME Events</h1>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
