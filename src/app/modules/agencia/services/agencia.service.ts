import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.URL}/agencia`);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/agencia/${id}`,cliente);
  }
}
