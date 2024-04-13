// country-detail.component.ts

// Import necessary modules and services
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Country } from '../country';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<CountryDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  getMapImage(code: string): string {
    return `https://ejd.songho.ca/syst24444/maps/${code.toLowerCase()}.gif`;
  }
}
