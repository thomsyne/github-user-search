import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse, UserDetails } from "../models/response.model";
import { ErrorHandlers } from "../utils/error.handler";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

constructor(
  private readonly http: HttpClient
) { }

searchUsers(filters: any): Observable<ApiResponse>{

  const query = new URLSearchParams(filters as any).toString()

  return this.http.get<ApiResponse>(`${environment.baseUrl}?${query}`
    ).pipe(
      catchError(ErrorHandlers.handleApiError)
    )
}

  specificSearch(url: string): Observable<UserDetails>{
    return this.http.get<UserDetails>(url).pipe(
      catchError(ErrorHandlers.handleApiError)
    );
  }

}
