import { TestBed } from '@angular/core/testing';

import { NotificationService, NotificationType } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockSnackBarRef: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    // Mock the snackbar
    mockSnackBarRef = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: mockSnackBarRef }],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackbar open when showMessage is called', () => {
    service.showMessage('Test message', NotificationType.Success);
    expect(mockSnackBarRef.open).toHaveBeenCalled();
  });

  it('should call snackbar open with the correct message', () => {
    service.showMessage('Test message', NotificationType.Success);
    expect(mockSnackBarRef.open).toHaveBeenCalledWith(
      'Test message',
      'Close',
      jasmine.any(Object)
    );
  });
});
