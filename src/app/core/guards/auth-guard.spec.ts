import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { TestBed } from '@angular/core/testing';
import { featureFlagGuard } from './auth-guard';

describe('featureFlagGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const mockUrlTree = {} as UrlTree;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'isFeatureEnabled',
    ]);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);
    notificationService = jasmine.createSpyObj('NotificationService', [
      'showMessage',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: NotificationService, useValue: notificationService },
      ],
    });

    router.createUrlTree.and.returnValue(mockUrlTree);
  });

  it('should redirect to login if the user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);

    TestBed.runInInjectionContext(() => {
      const guard = featureFlagGuard('featureX', '/no-access')(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );

      expect(authService.isLoggedIn).toHaveBeenCalled();
      expect(notificationService.showMessage).toHaveBeenCalledWith(
        'You need to be logged in to access this feature',
        jasmine.any(String) // NotificationType.Error
      );
      expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
      expect(guard).toBe(mockUrlTree);
    });
  });

  it('should redirect to the specified route if the feature flag is disabled', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.isFeatureEnabled.and.returnValue(false);

    TestBed.runInInjectionContext(() => {
      const guard = featureFlagGuard('featureX', '/no-access')(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );
      expect(authService.isFeatureEnabled).toHaveBeenCalledWith('featureX');
      expect(notificationService.showMessage).toHaveBeenCalledWith(
        "You don't have access to this feature",
        jasmine.any(String) // NotificationType.Error
      );
      expect(router.createUrlTree).toHaveBeenCalledWith(['/no-access']);
      expect(guard).toBe(mockUrlTree);
    });
  });

  it('should allow navigation if the feature flag is enabled', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.isFeatureEnabled.and.returnValue(true);

    TestBed.runInInjectionContext(() => {
      const guard = featureFlagGuard('featureX', '/no-access')(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );
      expect(authService.isFeatureEnabled).toHaveBeenCalledWith('featureX');
      expect(notificationService.showMessage).not.toHaveBeenCalled();
      expect(router.createUrlTree).not.toHaveBeenCalled();
      expect(guard).toBe(true);
    });
  });
});
