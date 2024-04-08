import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.URL}/users/list`);
  }
  listRole() {
    return this.http.get(`${this.URL}/users/newrol`);
  }
  Remove(key: string){
    return this.http.delete(`${this.URL}/users/${key}`);
  }
  Save(cliente: any) {
    return this.http.post(`${this.URL}/users/`,cliente);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/users/${id}`,cliente);
  }
}
