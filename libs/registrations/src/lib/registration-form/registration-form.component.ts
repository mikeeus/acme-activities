import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Activity } from '@acme-widgets/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { map, merge, combineLatest, switchMap } from 'rxjs/operators';

@Component({
  selector: 'acme-widgets-registration-form',
  template: `
  <form [formGroup]="form" (keydown.enter)="$event.preventDefault(); nextStep()">
    <h2>Sign Up For ACME Activities!</h2>
  
    <div class="step" *ngIf="(step | async)?.name === 'name'">
      <acme-widgets-form-control
        label="First Name"
        [control]="firstName">
        <input
          formControlName="firstName"
          type="text"
          class="form-control"
          autofocus
          tabindex="0"
          required>
      </acme-widgets-form-control>
    
      <acme-widgets-form-control
        label="Last Name"
        [control]="lastName">
        <input
          formControlName="lastName"
          type="text"
          class="form-control"
          required>
      </acme-widgets-form-control>
    </div>

    <div class="step" *ngIf="(step | async)?.name === 'email'">
      <acme-widgets-form-control
        label="Email"
        [control]="email">
        <input
          formControlName="email"
          type="text"
          class="form-control"
          required
          autofocus
          tabindex="0">
      </acme-widgets-form-control>
    </div>
  
    <div class="step" *ngIf="(step | async)?.name === 'activity'">
      <acme-widgets-form-control
        label="Acitivity"
        [control]="activity">
        <select formControlName="activity" autofocus tabindex="0">
          <option *ngFor="let option of activities" value="{{option.name}}">
            {{option.name}}
          </option>
        </select>
      </acme-widgets-form-control>
    </div>
  
    <div class="step" *ngIf="(step | async)?.name === 'comments'">
      <acme-widgets-form-control label="Comments" [control]="comments">
        <textarea
          formControlName="comments"
          type="text"
          class="form-control"
          rows="10"
          autofocus
          tabindex="0">
        </textarea>
      </acme-widgets-form-control>
    </div>

    <div class="controls">
      <button
        type="button"
        *ngIf="(step | async)?.prev"
        (click)="prevStep()">
        Back
      </button>

      <button
        type="button"
        *ngIf="(step | async)?.next !== 'done'"
        [disabled]="!allowNext"
        (click)="nextStep()"
        style="margin-left: auto;">
        Next
      </button>

      <button
        *ngIf="(step | async)?.next === 'done'"
        [disabled]="form.invalid"
        (click)="submitForm(); $event.preventDefault()">
        Submit
      </button>
    </div>
  </form>
  `,
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();
  @Input() activities: Activity[];
  form: FormGroup;
  step: BehaviorSubject<RegistrationStep>;
  stepValid: Observable<boolean>;
  steps;
  allowNext = false

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      activity: ['', [Validators.required, Validators.minLength(2)]],
      comments: [''],
    });

    this.step = new BehaviorSubject({
      name: 'name',
      controls: [this.firstName, this.lastName],
      next: 'email',
      prev: null
    })

    this.steps = {
      name: {
        name: 'name',
        controls: [this.firstName, this.lastName],
        next: 'email'
      },
      email: {
        name: 'email',
        controls: [this.email],
        prev: 'name',
        next: 'activity'
      },
      activity: {
        name: 'activity',
        controls: [this.activity],
        prev: 'email',
        next: 'comments'
      },
      comments: {
        name: 'comments',
        controls: [],
        prev: 'activity',
        next: 'done'
      }
    }

    this.stepValid = this.form.valueChanges.pipe(
      combineLatest(this.step),
      map(([_formValue, step]) => this.validate(step.controls))
    )
    this.stepValid.subscribe(valid => this.allowNext = valid)
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get activity() { return this.form.get('activity'); }
  get comments() { return this.form.get('comments'); }

  submitForm() {
    this.submit.emit(this.form.value)
  }

  validate(controls: AbstractControl[]): boolean {
    const valid = controls.length === 0 ||
      controls.map(c => c.valid).indexOf(false) === -1;
      console.log('valid: ', valid)
      return valid;
  }

  nextStep() {
    if (this.validate(this.step.value.controls)) {
      if (this.step.value.next === 'done') {
        this.submitForm()
      } else {
        this.step.next(this.steps[this.step.value.next])
      }
    }
  }

  prevStep() {
    this.step.next(this.steps[this.step.value.prev])
  }
}

export interface RegistrationStep {
  name: string;
  prev: string;
  next: string;
  controls: AbstractControl[]
}