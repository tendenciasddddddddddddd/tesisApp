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
  getById(key: string) {
    return this.http.get(`${this.URL}/archivador/${key}`);
  }
  Remove(key: string){
    return this.http.delete(`${this.URL}/archivador/${key}`);
  }
  Save(data: any) {
    return this.http.post(`${this.URL}/archivador/`,data);
  }
  Update(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/${id}`,data);
  }
  saveRequerimiento(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/requerimiento/${id}`,data);
  }
  updateRequerimiento(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/updateRequerimiento/${id}`,data);
  }
  updateAbona(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/abona/${id}`,data);
  }
  removeRequerimiento(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/removeRequerimiento/${id}`,data);
  }
  removePagos(id: string ,data: any) {
    return this.http.put(`${this.URL}/archivador/removePagos/${id}`,data);
  }

  listCliente() {
    return this.http.get(`${this.URL}/cliente/list`);
  }
  listServicio() {
    return this.http.get(`${this.URL}/servicios/list`);
  }

  Comprobante(data: any) {
    return this.http.post(`${this.URL}/reportes/`,data);
  }
  builfPdf(data: any) {
    return this.http.post(`${this.URL}/reportes/buildpdf/`,data);
  }
  ComprobanteAbonos(data: any) {
    return this.http.post(`${this.URL}/reportes/abonos`,data);
  }
  builfPdfAbonos(data: any) {
    return this.http.post(`${this.URL}/reportes/buildpdfabonos/`,data);
  }
}
