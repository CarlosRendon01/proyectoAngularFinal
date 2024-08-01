import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-carro',
  templateUrl: './editar-carro.component.html',
  styleUrls: ['./editar-carro.component.css']
})
export class EditarCarroComponent {
  car: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditarCarroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.car = { ...data };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(form: any): void {
    if (form.valid) {
      this.dialogRef.close(this.car);
    }
  }
}
