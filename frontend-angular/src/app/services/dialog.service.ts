import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ChoiceDialogComponent} from '../components/shared/dialog/choice-dialog/choice-dialog.component';
import {DialogContent} from '../shared/dialog-data/dialog-content';
import {Observable} from 'rxjs';
import {MessageDialogComponent} from '../components/shared/dialog/message-dialog/message-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openChoiceDialog(data: DialogContent, config?: { disableClose?: boolean }): Observable<boolean> {
    const dialogRef = this.dialog.open(ChoiceDialogComponent, {
      data: data,
      disableClose: config?.disableClose
    });
    return dialogRef.afterClosed();
  }

  public openMessageDialog(data: DialogContent, config?: { disableClose?: boolean }): Observable<any> {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: data,
      disableClose: config?.disableClose
    });
    return dialogRef.afterClosed();
  }
}
