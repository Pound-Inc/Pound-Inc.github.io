import {
  Component,
  ElementRef,
  Input,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/admin/services/user.service';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../../services/auth.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Country, State, City, ICountry } from 'country-state-city';
import * as countriesLocale from 'i18n-iso-countries/';

@Component({
  selector: 'app-register-final',
  templateUrl: './register-final.component.html',
  styleUrls: ['./register-final.component.scss'],
})
export class RegisterFinalComponent implements OnInit {
  translateBaseRoute = 'routing.auth.register.';
  @Input() firstInputs: any;
  public step = 2;
  model: NgbDateStruct;

  genders = ['Male', 'Female'];
  fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];

  @ViewChild('country') country: ElementRef;
  @ViewChild('city') city: ElementRef;
  @ViewChild('state') state: ElementRef;
  countries = Country.getAllCountries();
  countriesAR: ICountry[];

  states: any;
  cities: any;

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  preSelectedCountry: ICountry;

  form: FormGroup = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(this.genders[0]),
    fitnessLevel: new FormControl(this.fitnessLevels[0]),
    weightLoss: new FormControl(false),
    muscleGain: new FormControl(true),
    bulk: new FormControl(false),
    cut: new FormControl(false),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    countriesLocale.registerLocale(require('i18n-iso-countries/langs/en.json'));
    countriesLocale.registerLocale(require('i18n-iso-countries/langs/ar.json'));

    this.countriesAR = this.countries.map((c) => {
      return {
        ...c,
        name: countriesLocale.getName(c.isoCode, 'ar') as string,
      };
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      height: ['', Validators.required],
      weight: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: [this.genders[0], [Validators.required]],
      fitnessLevel: [this.fitnessLevels[0], [Validators.required]],
      weightLoss: [false, [Validators.required]],
      muscleGain: ['', [Validators.required]],
      bulk: [false, [Validators.required]],
      cut: [true, [Validators.required]],
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
    this.preSelectedCountry = this.countriesAR.find(
      (c) => c.isoCode === userInfo['country_code']
    ) as ICountry;

    this.cities = City.getCitiesOfCountry(this.preSelectedCountry.isoCode);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);

    const userAddress = {
      country: this.preSelectedCountry.name,
      city: JSON.parse(this.city.nativeElement.value).name,
      postal_code: userInfo.postal,
      street: '',
      street_2: '',
    };

    const date = this.form.value.dob;
    const dob = new Date(date.year + '-' + date.month + '-' + date.day);

    const newUser = {
      ip: userInfo.ip,
      email: this.firstInputs.email,
      password: this.firstInputs.password,
      name: this.firstInputs.name,
      img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      address: userAddress,
      gender: this.form.value.gender,
      height: this.form.value.height,
      weight: this.form.value.weight,
      dob: dob,
      level: this.form.value.fitnessLevel,
      goals: {
        weightLoss: this.form.value.weightLoss,
        cut: this.form.value.cut,
        bulk: this.form.value.bulk,
        muscleGain: this.form.value.muscleGain,
      },
    };

    this.userService
      .createNewUser(newUser)
      .then((response: User) => {
        this.router.navigate(['/auth/register-ok']);
      })

      .catch((error) => {});
  }

  onCountryChange(): void {
    this.states = State.getStatesOfCountry(
      JSON.parse(this.country.nativeElement.value).isoCode
    );
    this.selectedCountry = JSON.parse(this.country.nativeElement.value);
    this.cities = this.selectedState = this.selectedCity = null;
  }

  onStateChange(): void {
    this.cities = City.getCitiesOfState(
      JSON.parse(this.country.nativeElement.value).isoCode,
      JSON.parse(this.state.nativeElement.value).isoCode
    );
    this.selectedState = JSON.parse(this.state.nativeElement.value);
    this.selectedCity = null;
  }

  onCityChange(): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value);
  }

  clear(type: string): void {
    switch (type) {
      case 'country':
        this.selectedCountry =
          this.country.nativeElement.value =
          this.states =
          this.cities =
          this.selectedState =
          this.selectedCity =
            null;
        break;
      case 'state':
        this.selectedState =
          this.state.nativeElement.value =
          this.cities =
          this.selectedCity =
            null;
        break;
      case 'city':
        this.selectedCity = this.city.nativeElement.value = null;
        break;
    }
  }
}
