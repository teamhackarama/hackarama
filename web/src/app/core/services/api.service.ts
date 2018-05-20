import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class ApiResponse<T> {
  code: number;
  result: T;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private BASE_URL = 'https://9x2ncclhkj.execute-api.us-east-1.amazonaws.com/prod';

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private error(message: string) {
    console.log('danger', 'ApiService: ' + message);
  }
}
