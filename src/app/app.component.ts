import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Country } from './country'
import { CountryDialogComponent } from './country-dialog/country-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(country: Country) {
    this.dialog.open(CountryDialogComponent, {
      data: country
    });
  }
}
