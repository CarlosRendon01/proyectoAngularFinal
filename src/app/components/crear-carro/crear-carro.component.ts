import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-carro',
  templateUrl: './crear-carro.component.html',
  styleUrls: ['./crear-carro.component.css']
})
export class CrearCarroComponent {
  car: any = {};

  constructor(public dialogRef: MatDialogRef<CrearCarroComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(form: any): void {
    if (form.valid) {
      this.dialogRef.close(this.car);
    }
  }
}
