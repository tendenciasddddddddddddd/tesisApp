import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.URL}/cliente/list`);
  }
  Remove(key: string){
    return this.http.delete(`${this.URL}/cliente/${key}`);
  }
  Save(cliente: any) {
    return this.http.post(`${this.URL}/cliente/`,cliente);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/cliente/${id}`,cliente);
  }
}
