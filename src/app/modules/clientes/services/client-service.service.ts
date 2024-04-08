import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<any> {
    return this.http.get(`${this.URL}/tracks?src=${term}`)
      .pipe(
        map((dataRaw: any) => dataRaw.data)
      )
  }
  listClientes() {
    return this.http.get(`${this.URL}/cliente/list`);
  }
  eliminar(key: string){
    return this.http.delete(`${this.URL}/cliente/${key}`);
  }
  Guardar(cliente: any) {
    return this.http.post(`${this.URL}/cliente/`,cliente);
  }
  Update(id: string ,cliente: any) {
    return this.http.put(`${this.URL}/cliente/${id}`,cliente);
  }
}
