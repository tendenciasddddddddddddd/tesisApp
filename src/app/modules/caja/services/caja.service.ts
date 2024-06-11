import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get(`${this.URL}/cajas`);
  }
  Remove(key: string){
    return this.http.delete(`${this.URL}/cajas/${key}`);
  }
  Save(cliente: any) {
    return this.http.post(`${this.URL}/cajas/`,cliente);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/cajas/${id}`,cliente);
  }
  CerrarCaja(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/cajas/cerrar/${id}`,cliente);
  }

  Comprobante(user: any, total: any) {
    return this.http.get(`${this.URL}/reportes/cierrecaja?user=${user}&total=${total}`);
  }

  /*Historial de cajas */
  listHistorial() {
    return this.http.get(`${this.URL}/historial`);
  }
}
