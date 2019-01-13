import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'acme-widgets-footer',
  template: `
    <footer>
      <p>Copyright © 2019 <strong>ACME Widgets Inc</strong>. All rights reserved</p>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
