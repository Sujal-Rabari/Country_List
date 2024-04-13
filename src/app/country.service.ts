import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://ejd.songho.ca/syst24444/world/';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/countries.json`).pipe(
      catchError(error => {
        console.error('Error loading country data:', error);
        return throwError('Error loading country data. Please try again later.');
      })
    );
  }
}
