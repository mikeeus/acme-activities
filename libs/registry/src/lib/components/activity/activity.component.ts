import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '@acme-widgets/models';

@Component({
  selector: 'acme-widgets-activity',
  template: `
    <button [ngStyle]="{backgroundColor: activityClass}">
      {{activity}}
    </button>
  `,
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() activity: string;

  constructor() { }

  ngOnInit() {
  }

  get activityClass() {
    return Registration.activityClass(this.activity);
  }
}
