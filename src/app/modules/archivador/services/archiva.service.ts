import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchivaService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.URL}/archivador/list`);
  }
  Remove(key: string){
    return this.http.delete(`${this.URL}/archivador/${key}`);
  }
  Save(cliente: any) {
    return this.http.post(`${this.URL}/archivador/`,cliente);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/archivador/${id}`,cliente);
  }

  listCliente() {
    return this.http.get(`${this.URL}/cliente/list`);
  }
  listServicio() {
    return this.http.get(`${this.URL}/servicios/list`);
  }
}
