import { Component } from '@angular/core';
import { ExameService } from '../../servico/exame.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-exames',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-exames.component.html',
  styleUrl: './lista-exames.component.scss',
})
export class ListaExamesComponent {
  exames: any[] = [];
  paginaAtual = 1;
  totalPaginas = 1;
  loading = false;

  constructor(
    private exameService: ExameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarExames();
  }

  carregarExames() {
    this.loading = true;
    this.exameService.listar(this.paginaAtual, 10).subscribe({
      next: (resposta) => {
        this.exames = resposta.data;
        this.totalPaginas = resposta.totalPages;
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar exames:', erro);
        this.loading = false;
      }
    });
  }

  formatarData(data: string) {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  novoExame() {
    this.router.navigate(['/exames/novo']);
  }

  verDetalhes(exameId: string) {
    this.router.navigate(['/exames', exameId]);
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarExames();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarExames();
    }
  }
}
