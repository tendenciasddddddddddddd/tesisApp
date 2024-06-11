import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.URL}/cliente`);
  }
 
}
