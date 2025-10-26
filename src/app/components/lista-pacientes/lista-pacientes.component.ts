import { PacienteService } from '../../servico/paciente.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Paciente } from '../../modelo/Paciente';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss'],
})
export class ListaPacientesComponent {
  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  todosPacientes: Paciente[] = [];
  paginaAtual = 1;
  totalPaginas = 1;
  termoBusca = '';
  loading = false;

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarPacientes();
    this.carregarTodosPacientes();
  }

  //carrega todos apenas para o campo de busca
  carregarTodosPacientes() {
    this.pacienteService.listarTodos().subscribe({
      next: (resposta) => {
        this.todosPacientes = resposta.data;
      },
      error: (erro) => {
        console.error('Erro ao carregar todos pacientes:', erro);
      },
    });
  }

  //carrega para paginação até 10 pacientes
  carregarPacientes() {
    this.loading = true;

    this.pacienteService.listar(this.paginaAtual, 10).subscribe({
      next: (resposta) => {
        this.pacientes = resposta.data;
        this.pacientesFiltrados = resposta.data;
        this.totalPaginas = resposta.totalPages;
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pacientes:', erro);
        this.loading = false;
      },
    });
  }

  buscarPacientes() {
    if (!this.termoBusca) {
      this.pacientesFiltrados = this.pacientes;
    } else {
      this.pacientesFiltrados = this.todosPacientes.filter((paciente) =>
        paciente.name.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  cadastrarPaciente() {
    this.router.navigate(['/pacientes/novo']);
  }

  editarPaciente(id: string) {
    this.router.navigate(['/pacientes', id, 'editar']);
  }

  verExames(id: string) {
    this.router.navigate(['/pacientes', id]);
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarPacientes();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarPacientes();
    }
  }
}
