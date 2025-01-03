import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {
  NotificationService,
  NotificationType,
} from '../services/notification.service';
import { AuthService } from '../services/auth.service';

// Guard to check if the user has the feature flag enabled
export function featureFlagGuard(
  flagName: string,
  redirectRoute: string
): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notificationService = inject(NotificationService);

    if (!authService.isLoggedIn()) {
      notificationService.showMessage(
        'You need to be logged in to access this feature',
        NotificationType.Error
      );
      return router.createUrlTree(['/login']);
    }

    const isFeatureEnabled = authService.isFeatureEnabled(flagName);

    if (!isFeatureEnabled) {
      notificationService.showMessage(
        "You don't have access to this feature",
        NotificationType.Error
      );
    }

    return isFeatureEnabled || router.createUrlTree([redirectRoute]);
  };
}

// Simple guard to check if the user is authenticated
export const isAuthenticated = () => inject(AuthService).isLoggedIn();
