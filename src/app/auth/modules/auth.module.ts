import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  //servicess
  providers: [CookieService],
})
export class AuthModule {}
