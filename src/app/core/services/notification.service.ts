import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap, of, Subject } from 'rxjs';

export interface Message {
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
    this._messageSubject
      .pipe(concatMap(message => this._delaySnackBarMessagePipe(message)))
      .subscribe(message => {
        this._snackBar.open(message.message, 'Close', {
          duration: 3000,
          panelClass: `snack-bar-${message.type}`,
        });
      });
  }

  private readonly _snackBar = inject(MatSnackBar);
  private readonly _messageSubject = new Subject<Message>();

  private _delaySnackBarMessagePipe(message: Message) {
    const snackBarRef = this._snackBar._openedSnackBarRef;
    if (snackBarRef) {
      return snackBarRef.afterDismissed().pipe(() => of(message));
    }

    return of(message);
  }
}
