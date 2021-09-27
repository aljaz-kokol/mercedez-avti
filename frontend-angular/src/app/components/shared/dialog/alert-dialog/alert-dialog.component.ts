import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertDialogData} from '../../../../shared/dialog-data/alert-dialog.data';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: 'alert-dialog.component.html'
})
export class AlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
