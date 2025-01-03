import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isFeatureEnabled(featureName: string): boolean {
    console.log('TODO: Implement feature flag check', featureName);
    return false;
  }

  isLoggedIn(): boolean {
    console.log('TODO: Implement login check');
    return false;
  }
}
