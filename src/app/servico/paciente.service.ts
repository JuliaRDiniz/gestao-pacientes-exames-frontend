import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private url =
    'https://gestao-pacientes-exames-backend.onrender.com/pacientes';

  constructor(private http: HttpClient) {}

  listar(page: number = 1, pageSize: number = 10): Observable<any> {
    let url = `${this.url}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(url);
  }

  //apenas para eu utilizar na busca
  listarTodos(): Observable<any> {
    return this.http.get(`${this.url}?page=1&pageSize=1000`); // Pega muitos de uma vez
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  cadastrar(paciente: any): Observable<any> {
    return this.http.post(this.url, paciente);
  }

  atualizar(id: string, paciente: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, paciente);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  buscarExames(pacienteId: string): Observable<any> {
    return this.http.get(`${this.url}/${pacienteId}/exames`);
  }
}
