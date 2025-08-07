import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-delete.html',
  styleUrl: './confirm-delete.scss',
})
export class ConfirmDelete {
  dialogRef = inject(MatDialogRef<ConfirmDelete>);
}
