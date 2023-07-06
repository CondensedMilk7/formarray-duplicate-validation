import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formGroup = this.fb.group({
    hobbies: this.fb.array([this.fb.control('', [Validators.required])]),
  });

  get hobbies() {
    return this.formGroup.controls.hobbies;
  }

  constructor(private fb: FormBuilder) {
    this.hobbies.setValidators(this.duplicateHobby());
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  addHobby() {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  duplicateHobby(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const values = control.value as string[];
      // Sets only store unique values
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
      const withNoDuplicates = new Set<string>(values);

      if (values.length > withNoDuplicates.size) {
        return {
          duplicateHobby: 'Please do not write the same hobby more than once',
        };
      }
      return null;
    };
  }
}
