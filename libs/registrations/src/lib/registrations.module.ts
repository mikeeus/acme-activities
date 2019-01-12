import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RegistrationFormComponent],
  exports: [RegistrationFormComponent]
})
export class RegistrationsModule {}
