import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../servico/paciente.service';
import { ExameService } from '../../servico/exame.service';

@Component({
  selector: 'app-detalhes-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-paciente.component.html',
  styleUrl: './detalhes-paciente.component.scss',
})
export class DetalhesPacienteComponent {
  paciente: any;
  exames: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private exameService: ExameService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.carregarPaciente(id);
    this.carregarExames(id);
  }

  carregarPaciente(id: string) {
    this.pacienteService.buscarPorId(id).subscribe({
      next: (data) => (this.paciente = data),
      error: () => alert('Erro ao carregar paciente'),
    });
  }

  carregarExames(pacienteId: string) {
    this.pacienteService.buscarExames(pacienteId).subscribe({
      next: (data) => (this.exames = data),
      error: () => alert('Erro ao carregar exames'),
    });
  }

  formatarData(data: string) {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  novoExame() {
    console.log('Navegando para novo exame do paciente:', this.paciente?.id);

    if (this.paciente?.id) {
      this.router.navigate(['/exames/novo'], {
        queryParams: { pacienteId: this.paciente.id },
      });
    } else {
      console.error('Paciente não carregado ou sem ID');
    }
  }

  editarPaciente() {
    this.router.navigate(['/pacientes', this.paciente.id, 'editar']);
  }

  verExame(exameId: string) {
    this.router.navigate(['/exames', exameId]);
  }

  excluirExame(exameId: string) {
    if (confirm('Deseja excluir este exame?')) {
      this.exameService.excluir(exameId).subscribe({
        next: () => {
          alert('Exame excluído!');
          this.carregarExames(this.paciente.id);
        },
        error: () => alert('Erro ao excluir exame'),
      });
    }
  }

  voltar() {
    this.router.navigate(['/pacientes']);
  }
}
