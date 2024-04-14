import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CountryDialogComponent } from '../country-dialog/country-dialog.component';
import { Country } from '../country'; // Adjust the import path as needed
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; // Import MatPaginator and PageEvent

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  displayedColumns: string[] = ['Flag', 'Name', 'Code', 'Continent'];
  countries: MatTableDataSource<Country>;
  filterValue: string = '';
  
  // ViewChild for MatSort and MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.countries = new MatTableDataSource<Country>([]);
  }

  ngOnInit(): void {
    this.loadData(5, 0); // Load initial page with default page size of 5 and page index 0
  }

  loadData(pageSize: number, pageIndex: number): void {
    const url = `https://ejd.songho.ca/syst24444/world/?pageSize=${pageSize}&pageIndex=${pageIndex}`;
    this.http.get<any>(url)
      .subscribe({
        next: (data) => {
          this.countries = new MatTableDataSource<Country>(data.Country);
          this.countries.sort = this.sort;
          this.countries.paginator = this.paginator;
        },
        error: (error) => {
          console.error('Error loading country data:', error);
        }
      });
  }

  applyFilter(filterValue: string): void {
    this.countries.filter = filterValue.trim().toLowerCase();
  }

  openDialog(country: Country): void {
    this.dialog.open(CountryDialogComponent, {
      width: '500px',
      data: country
    });
  }

  getFlagImage(code2: string): string {
    return `https://ejd.songho.ca/syst24444/flags/${code2.toLowerCase()}.jpg`;
  }

  onPageChange(event: PageEvent): void {
    this.loadData(event.pageSize, event.pageIndex);
  }

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value; // Type assertion to HTMLInputElement
    this.applyFilter(inputValue.trim().toLowerCase()); // Make sure to trim and convert to lowercase
  }
}
