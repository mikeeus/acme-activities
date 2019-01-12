import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'acme-widgets-registration-form',
  template: `
  <form [formGroup]="form" (submit)="submitForm()">
    <h2>Sign Up For ACME Activities!</h2>
  
    <acme-widgets-form-control label="First Name" [control]="firstName">
      <input formControlName="firstName" type="text" class="form-control" required>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Last Name" [control]="lastName">
      <input formControlName="lastName" type="text" class="form-control" required>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Email" [control]="email">
      <input formControlName="email" type="text" class="form-control" required>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Acitivity" [control]="activity">
      <select formControlName="activity">
        <option *ngFor="let option of activities" value="{{option}}">
          {{option}}
        </option>
      </select>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Comments" [control]="comments">
      <textarea formControlName="comments" type="text" class="form-control"></textarea>
    </acme-widgets-form-control>
  
    <div class="controls">
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </div>
  </form>
  `,
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();

  form: FormGroup;
  activities = [
    'Christmas Party',
    'Company Retreat',
    'Traning Session'
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      activity: ['', [Validators.required, Validators.minLength(2)]],
      comments: [''],
    })
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get activity() { return this.form.get('activity'); }
  get comments() { return this.form.get('comments'); }

  submitForm() {
    this.submit.emit(this.form.value())
  }
}
