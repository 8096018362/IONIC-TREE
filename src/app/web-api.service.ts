import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map,  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  public BASE_URL = "path";

  constructor(private http: HttpClient) { }


  serviceCall(formData: any, URL: any) {
    console.log("serviceCall::DATA", formData);
    console.log("serviceCall::URL", URL);

    const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' });
    reqHeader.append('Content-Type', 'application/json');
    return this.http.post(this.BASE_URL + URL, formData)
      .pipe(map(res => res), catchError(this.errorHandler)
      );
  }
  errorHandler(error: Response) {
    console.log("RESULT:::", error);
    return throwError(error);
  }
}
