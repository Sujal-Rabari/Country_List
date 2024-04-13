import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Country } from '../country';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  getMapImage(code2: string): string {
    return `https://ejd.songho.ca/syst24444/maps/${code2.toLowerCase()}.gif`;
  }

}
