import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExameService {
  private url = 'http://localhost:3000/exames';

  constructor(private http: HttpClient) {}

  listar(page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get(`${this.url}?page=${page}&pageSize=${pageSize}`);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  cadastrar(exame: any): Observable<any> {
    return this.http.post(this.url, exame);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
