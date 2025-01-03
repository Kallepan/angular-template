import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { constants } from '@core/constants';
import { concatMap, delay, of, Subject } from 'rxjs';

export enum NotificationType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
}

export interface Message {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _messageSubject = new Subject<Message>();

  private readonly _horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private readonly _verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor() {
    // This is technically a memory leak, but it's a singleton service so it's fine
    this._messageSubject
      .pipe(
        concatMap(message => {
          if (this._snackBar._openedSnackBarRef)
            return of(message).pipe(delay(constants.MESSAGE_DURATION));

          return of(message);
        })
      )
      .subscribe(message => {
        this._snackBar.open(message.message, 'Close', {
          duration: constants.MESSAGE_DURATION,
          panelClass: message.type,
          horizontalPosition: this._horizontalPosition,
          verticalPosition: this._verticalPosition,
        });
      });
  }

  showMessage(message: string, type: NotificationType) {
    this._messageSubject.next({ message, type: type });
  }
}
