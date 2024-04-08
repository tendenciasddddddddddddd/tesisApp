import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServServiceService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get(`${this.URL}/servicios/list`);
  }
  Remove(key: string){
    return this.http.delete(`${this.URL}/servicios/${key}`);
  }
  Save(cliente: any) {
    return this.http.post(`${this.URL}/servicios/`,cliente);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/servicios/${id}`,cliente);
  }
}
