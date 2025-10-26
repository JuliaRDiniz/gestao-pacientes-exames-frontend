import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExameService } from '../../servico/exame.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-exame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-exame.component.html',
  styleUrl: './detalhes-exame.component.scss',
})
export class DetalhesExameComponent {
  exame: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exameService: ExameService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.carregarExame(id);
  }

  carregarExame(id: string) {
    this.exameService.buscarPorId(id).subscribe({
      next: (data) => (this.exame = data),
      error: () => alert('Exame não encontrado'),
    });
  }

  formatarData(data: string) {
    return new Date(data).toLocaleString('pt-BR');
  }

  excluirExame() {
    if (confirm('Tem certeza que deseja excluir este exame?')) {
      this.exameService.excluir(this.exame.id).subscribe({
        next: () => {
          alert('Exame excluído com sucesso!');
          this.voltar();
        },
        error: () => alert('Erro ao excluir exame'),
      });
    }
  }

  voltar() {
    this.router.navigate(['/pacientes']);
  }
}
