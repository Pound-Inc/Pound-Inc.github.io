import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { ProgramService } from '../admin/services/program.service';

export const programGuard = async (route: ActivatedRouteSnapshot) => {
  const programService = inject(ProgramService);
  const router = inject(Router);
  const programId = route.params['programId'];

  const program = await programService.getProgramById(programId);
  if (program) {
    return true;
  }
  return false;
};
