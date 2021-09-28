import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogComponent} from '../components/shared/dialog/alert-dialog/alert-dialog.component';
import {AlertDialogData} from '../shared/dialog-data/alert-dialog.data';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openAlertDialog(data: AlertDialogData, disableClose?: boolean): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: data,
      disableClose: disableClose
    });
    return dialogRef.afterClosed();
  }
}
