import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const adminGuard: CanActivateFn = async (route, state) => {

  const userService = inject(UserService)
  const router = inject(Router)

  try {

    const response: any = await userService.findRole()
    if (response.role != 'ROLE_ADMIN') {
      router.navigate(['/forbidden'])
      return false;
    }

  } catch (error) {

    console.error(error)
  }

  return true;
};
