import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
import { Country } from '../country'; // Adjust the import path as needed
import { CountryService } from '../country.service'; // Adjust the import path as needed
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  displayedColumns: string[] = ['Flag', 'Code', 'Name', 'Continent', 'SurfaceArea', 'Population', 'GNP', 'Code2'];
  countries: MatTableDataSource<Country>;
  filterValue: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.countries = new MatTableDataSource<Country>([]);
  }

  ngOnInit(): void {
    this.loadData();
    this.countries.sort = this.sort;
  }

  loadData(): void {
    this.http.get<any>('https://ejd.songho.ca/syst24444/world/')
      .subscribe({
        next: (data) => {
          this.countries = new MatTableDataSource<Country>(data.Country);
          this.countries.sort = this.sort;
        },
        error: (error) => {
          console.error('Error loading country data:', error);
        }
      });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: string): boolean {
      const searchTerms = filter.split(' ');
      return searchTerms.every(term =>
        data.name.toLowerCase().includes(term.toLowerCase()) ||
        data.code.toLowerCase().includes(term.toLowerCase()) ||
        data.continent.toLowerCase().includes(term.toLowerCase())
      );
    }
    return filterFunction;
  }

  applyFilter(): void {
    this.countries.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter(): void {
    this.filterValue = '';
    this.applyFilter();
  }

  openDialog(country: Country): void {
    this.dialog.open(CountryDetailComponent, {
      width: '500px',
      data: country
    });
  }

  getFlagImage(code2: string): string {
    return `https://ejd.songho.ca/syst24444/flags/${code2.toLowerCase()}.jpg`;
  }

}
