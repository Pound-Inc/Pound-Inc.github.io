import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { UserService } from 'src/app/admin/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OnboardingStep, StepName } from 'src/app/model/steps.model';
import { Gender, User } from 'src/app/model/user.model';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  public step: number;
  public submitted: boolean = false;
  public data: OnboardingStep[];

  constructor(
    private userService: UserService,
    private onboardingService: OnboardingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onboardingService
      .getOnboardingData()
      .subscribe((data: OnboardingStep[]) => {
        if (data.length === 0) {
          this.step = 0;
        } else {
          this.step = data.length;
          this.data = data;
          if (this.step === 14) {
            this.registerNewUser();
          }
        }
      });
  }

  private createUserObject() {
    const userGeoInfo = this.getUserGeoInfo();
    const userBodyInfo = this.parseOnboardingData();

    const userPassword = '123123123';

    const newUser = {
      ip: userGeoInfo.ip,
      address: userGeoInfo.userAddress,
      email: userBodyInfo.email,
      password: userPassword,
      name: userBodyInfo.name,
      img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      gender: userBodyInfo.gender,
      dob: userBodyInfo.dob,
      body_info: {
        height: userBodyInfo.height,
        weight: userBodyInfo.weight,
        pain_areas: userBodyInfo.pain_areas,
        body_shape: userBodyInfo.body_shape,
        dream_body_shape: userBodyInfo.dream_body_shape,
        last_time_best_body_shape: userBodyInfo.last_time_best_body_shape,
        dream_weight: userBodyInfo.dream_weight,
      },
    };

    return newUser;
  }

  private login(loginPayLoad: { email: string; password: string }) {
    this.authService.login(loginPayLoad).then(() => {
      setTimeout(() => {
        this.router.navigate(['/program/65a3da3bd36d699321423251']);
      }, 1000);
    });
  }

  registerNewUser(): void {
    const user = this.createUserObject();
    this.userService
      .createNewUser(user)
      .then((response: User) => {
        this.login({ email: user.email, password: user.password });
      })

      .catch((error) => {
        console.log(error);
        this.login({ email: user.email, password: user.password });
      });
  }

  private getUserGeoInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);

    const ip = userInfo.ip;

    const userAddress = {
      country: userInfo.country,
      city: userInfo.city,
      postal_code: userInfo.postal,
      street: '',
      street_2: '',
    };

    return { ip, userAddress };
  }

  private parseOnboardingData() {
    return {
      name: this.getDataForStep(StepName.NAME),
      email: this.getDataForStep(StepName.EMAIL),
      height: this.getDataForStep(StepName.HEIGHT),
      weight: this.getDataForStep(StepName.WEIGHT),
      body_shape: this.getDataForStep(StepName.BODY_SHAPE),
      dream_body_shape: this.getDataForStep(StepName.DREAM_BODY_SHAPE),
      last_time_best_body_shape: this.getDataForStep(
        StepName.LAST_TIME_BEST_BODY_SHAPE
      ),
      pain_areas: this.getDataForStep(StepName.PAIN_AREAS),
      dream_weight: this.getDataForStep(StepName.DREAM_WEIGHT),
      dob: this.getDataForStep(StepName.AGE),
      gender: Gender.Female,
    };
  }

  private getDataForStep(stepName: StepName): any {
    const stepData = this.data.find((item) => item.step === stepName);

    return stepData?.data;
  }
}