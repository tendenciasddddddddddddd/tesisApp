
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) {

  }

  /**
   * 
   * @returns Devolver todas las canciones! molonas! 🤘🤘
   */



  /**
   * //TODO {data:[..1,...2,..2]}
   * 
   * @returns 
   */
  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data
        })
      )
  }


  /**
   * 
   * @returns Devolver canciones random
   */

}
