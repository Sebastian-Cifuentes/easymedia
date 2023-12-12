import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {

  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = storageService.getToken();
    if (token) {
      const { token: t, ...user } = await authService.checkAuthStatus();
      storageService.setToken(t!);
      storageService.setUser(user);
      return true;
    }
    router.navigateByUrl('/auth/login');
    return false;
};

