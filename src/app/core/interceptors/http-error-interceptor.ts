import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  NotificationService,
  NotificationType,
} from '../services/notification.service';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const notificationService = inject(NotificationService);

  function getParsedErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';

      default:
        return 'An unknown error occurred';
    }
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = getParsedErrorMessage(error);

      notificationService.showMessage(errorMessage, NotificationType.Error);
      // Rethrow error
      const parsedError = {
        parsedErrorMessage: errorMessage,
        ...error,
      };
      return throwError(() => parsedError);
    })
  );
};
