import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinalService {

  private readonly URL = environment.api

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get(`${this.URL}/archivador/listFin`);
  }
  getById(key: string) {
    return this.http.get(`${this.URL}/archivador/${key}`);
  }

  Comprobante(data: any) {
    return this.http.post(`${this.URL}/reportes/`,data);
  }
  builfPdf(data: any) {
    return this.http.post(`${this.URL}/reportes/buildpdf/`,data);
  }
  Update(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/${id}`,data);
  }
}
