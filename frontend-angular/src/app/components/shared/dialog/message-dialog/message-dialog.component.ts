import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogContent} from '../../../../shared/dialog-data/dialog-content';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
  constructor(private dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogContent) {}
  onOK(): void {
    this.dialogRef.close();
  }
}
