import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Registration } from '@acme-widgets/models';

@Component({
  selector: 'acme-widgets-registration-item',
  template: `
    <li>
      <div class="info">
        <strong>
          {{registration.firstName}} {{registration.lastName}}
        </strong>
        <small title="{{registration.email}}">{{registration.email}}</small>
    
        <acme-widgets-activity
          class="activity"
          [activity]="registration.activity"
          (click)="filter.emit(registration.activity)">
        </acme-widgets-activity>
    
        <button
          class="delete"
          *ngIf="userEmail === registration.email"
          (click)="delete.emit(registration.id)">
          ✖
        </button>
      </div>
    
      <small class="comments">
        {{registration.comments}}
      </small>
    </li>
  `,
  styleUrls: ['./registration-item.component.scss']
})
export class RegistrationItemComponent implements OnInit {
  @Input() registration: Registration;
  @Input() userEmail: string;

  @Output() delete = new EventEmitter<number>();
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
