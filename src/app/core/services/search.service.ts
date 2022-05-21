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

searchUsers(query?: string, page?: string, per_page?: string): Observable<ApiResponse>{
  let params = new HttpParams();
  if (!!query){
    params = params.append('q', `${query}`)
  }
  if (!!page){
    params = params.append('page', `${page}`)
  }
  if (!!per_page){
    params = params.append('per_page', `${per_page}`)
  }

  return this.http.get<ApiResponse>(`${environment.baseUrl}`, {params}
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
