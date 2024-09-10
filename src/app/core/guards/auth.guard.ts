import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let platform = inject(PLATFORM_ID);
  let router = inject(Router);
  if (isPlatformBrowser(platform)) {
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      router.navigate(['/sign-in']);
      return false;
    }
  } else {
    return false;
  }
};
