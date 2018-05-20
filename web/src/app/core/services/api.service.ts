import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface DynamoDbField {
  S: string;
}

interface DynamoDbItem {
  FeedbackDate: DynamoDbField;
  FeedbackId: DynamoDbField;
  FeedbackSentiment: DynamoDbField;
  FeedbackLocation: DynamoDbField;
  FeedbackText: DynamoDbField;
}

export interface Result {
  date: string;
  id: string;
  sentiment: boolean;
  location: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private BASE_URL = 'https://9x2ncclhkj.execute-api.us-east-1.amazonaws.com/prod';

  constructor(private http: HttpClient) { }

  public get() {
    return <Observable<Result[]>>this.http.get<DynamoDbItem[]>(this.BASE_URL)
      .pipe(
        map(response => {
          return response.map(r => {
            return {
              date: r.FeedbackDate.S,
              id: r.FeedbackId.S,
              sentiment: r.FeedbackSentiment.S === 'positive',
              location: r.FeedbackLocation.S,
              text: r.FeedbackText.S
            }
          });
        }),
        catchError(this.handleError('get', []))
      );
  }

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
