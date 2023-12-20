import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-register-final',
  templateUrl: './register-final.component.html',
  styleUrls: ['./register-final.component.scss'],
})
export class RegisterFinalComponent implements OnInit {
  translateBaseRoute = 'routing.auth.register.';
  public step = 2;

  genders = ['male', 'female'];
  fitnessLevels = ['beginner', 'intermediate', 'advanced'];

  form: FormGroup = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(this.genders[0]),
    fitnessLevel: new FormControl(this.fitnessLevels[0]),
    weightLoss: new FormControl(false),
    muscleGain: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
