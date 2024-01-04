import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { catchError, delay, from, map, of, switchMap, tap } from 'rxjs';

export const authGuard = () => {};
